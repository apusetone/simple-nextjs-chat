import create from 'zustand';

export interface Message {
  message: string;
  connection_id?: string;
  username?: string;
}

interface ChatState {
  messages: Message[];
  addMessage: (message: Message) => void;
}

const useChatStore = create<ChatState>((set) => ({
  messages: [],
  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),
}));

export default useChatStore;
