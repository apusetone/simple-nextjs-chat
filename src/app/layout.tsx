"use client";

import { FC, ReactNode, createContext, useContext } from 'react';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { createStore, useStore } from 'zustand';
import './globals.css';
import { Message } from '@/stores/chatStore';

const cache = createCache({ key: 'css' });

// Zustand storeの設定
interface ChatState {
  messages: Message[];
  addMessage: (message: Message) => void;
}

const store = createStore<ChatState>((set) => ({
  messages: [],
  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),
}));

const StoreContext = createContext(store);

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <html lang="en">
    <body>
      <CacheProvider value={cache}>
        <StoreContext.Provider value={store}>
          {children}
        </StoreContext.Provider>
      </CacheProvider>
    </body>
  </html>
);

export default RootLayout;

// Hook to use the store
export const useChatStore = <T,>(selector: (state: ChatState) => T) => {
  const store = useContext(StoreContext);
  return useStore(store, selector);
};
