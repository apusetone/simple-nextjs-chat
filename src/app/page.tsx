"use client";

import { FC, useState, useEffect, useRef } from 'react';
import ChatForm from '@/components/ChatForm';
import { useChatStore } from './layout';
import { Message } from '@/stores/chatStore';

const HomePage: FC = () => {
  const messages: Message[] = useChatStore((state) => state.messages);
  const addMessage = useChatStore((state) => state.addMessage);
  const [ws, setWs] = useState<WebSocket | null>(null);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    const socket = new WebSocket(process.env.NEXT_PUBLIC_WS_URL as string);
    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        addMessage({ message: data.message, connection_id: data.connection_id || 'unknown' });
      } catch (error) {
        console.error('Error parsing message:', error);
      }
    };
    setWs(socket);

    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (message: string) => {
    if (ws) {
      ws.send(message);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-y-auto bg-gray-100 p-4 space-y-4 pb-16">
        {messages.map((msg, index) => {
          const isLocal = msg.connection_id === 'local';
          return (
            <div key={index} className={`flex ${isLocal ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs lg:max-w-md xl:max-w-lg ${isLocal ? 'bg-blue-500 text-white' : 'bg-white'} rounded-lg p-3 shadow`}>
                <div className="text-xs mb-1 opacity-70">{`(${msg.connection_id}) ${msg.message}`}</div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <ChatForm onSend={handleSend} />
      </div>
    </div>
  );
};

export default HomePage;
