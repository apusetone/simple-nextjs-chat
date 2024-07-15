"use client";

import * as React from 'react';
import Box from '@mui/joy/Box';
import Sheet from '@mui/joy/Sheet';
import Stack from '@mui/joy/Stack';
import ChatBubble from './ChatBubble';
import MessageInput from './MessageInput';
import { ChatProps, MessageProps } from '@/types';

type MessagesPaneProps = {
  chat: ChatProps;
};

export default function MessagesPane(props: MessagesPaneProps) {
  const { chat } = props;
  const [chatMessages, setChatMessages] = React.useState(chat.messages);
  const [ws, setWs] = React.useState<WebSocket | null>(null);

  const connectWebSocket = React.useCallback(() => {
    const socket = new WebSocket(process.env.NEXT_PUBLIC_WS_URL as string);
    
    socket.onopen = () => {
      console.log('WebSocket connection established');
      setWs(socket);
    };
    
    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        addMessage({ message: data.message, connection_id: data.connection_id || 'unknown' });
      } catch (error) {
        console.error('Error parsing message:', error);
      }
    };
    
    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
    
    socket.onclose = (event) => {
      console.log('WebSocket connection closed');
      setWs(null);
      
      if (!event.wasClean) {
        console.log('WebSocket connection lost. Attempting to reconnect...');
        setTimeout(connectWebSocket, 2000); // 2秒後に再接続を試みる
      }
    };

    return socket;
  }, []);

  React.useEffect(() => {
    const socket = connectWebSocket();
    
    return () => {
      socket.close();
    };
  }, [connectWebSocket]);

  React.useEffect(() => {
    setChatMessages(chat.messages);
  }, [chat.messages]);

  const addMessage = React.useCallback((message: { message: string; connection_id: string }) => {
    const newMessage: MessageProps = {
      id: (chatMessages.length + 1).toString(),
      sender: message.connection_id === 'local' ? 'You' : 'Other',
      content: message.message,
      timestamp: 'Just now',
    };
    setChatMessages((prevMessages) => [...prevMessages, newMessage]);
  }, [chatMessages]);

  return (
    <Sheet
      sx={{
        height: { xs: 'calc(100dvh - var(--Header-height))', lg: '100dvh' },
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'background.level1',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flex: 1,
          minHeight: 0,
          px: 2,
          py: 3,
          overflowY: 'scroll',
          flexDirection: 'column-reverse',
        }}
      >
        <Stack spacing={2} justifyContent="flex-end">
          {chatMessages.map((message: MessageProps, index: number) => {
            const isYou = message.sender === 'You';
            return (
              <Stack
                key={index}
                direction="row"
                spacing={2}
                flexDirection={isYou ? 'row-reverse' : 'row'}
              >
                <ChatBubble variant={isYou ? 'sent' : 'received'} {...message} />
              </Stack>
            );
          })}
        </Stack>
      </Box>
      <MessageInput ws={ws} addMessage={addMessage} />
    </Sheet>
  );
}