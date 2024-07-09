"use client";

import { FC, useState, useEffect, useRef } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { IoSend } from 'react-icons/io5';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Sheet from '@mui/joy/Sheet';
import { useChatStore } from './layout';
import { Message } from '@/stores/chatStore';
import MessagesPane from '@/components/MessagesPane';
import MyMessages from '@/components/MyMessages'
import { ChatProps, MessageProps } from '@/types';

interface FormValues {
  message: string;
}

const HomePage: FC = () => {
  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
        <Box component="main" className="MainContent" sx={{ flex: 1 }}>
          <MyMessages />
        </Box>
      </Box>
    </CssVarsProvider>
  );
};

export default HomePage;
