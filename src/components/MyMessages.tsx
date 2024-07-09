"use client";

import * as React from 'react';
import Sheet from '@mui/joy/Sheet';

import MessagesPane from './MessagesPane';
import ChatsPane from './ChatsPane';
import { ChatProps } from '@/types';
import { chats } from '@/data';

export default function MyProfile() {
  const [selectedChat, setSelectedChat] = React.useState<ChatProps>(chats[0]);
  return (
    <Sheet
      sx={{
        flex: 1,
        width: '100%',
        mx: 'auto',
        pt: { xs: 'var(--Header-height)', sm: 0 },
        display: 'grid',
        gridTemplateColumns: '1fr', // Changed this to make it full width
      }}
    >
      <Sheet
        sx={{
          position: 'static', // Changed from fixed/sticky to static
          width: '100%',
          height: '100%', // Added to ensure full height
        }}
      >
        <MessagesPane chat={selectedChat} />
      </Sheet>
    </Sheet>
  );
}
