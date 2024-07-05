"use client";

import { FC } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { IoSend } from 'react-icons/io5';

interface FormValues {
  message: string;
}

const ChatForm: FC<{ onSend: (message: string) => void }> = ({ onSend }) => {
  const { register, handleSubmit, reset } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    if (data.message.trim()) {
      onSend(data.message);
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white border-t border-gray-200 p-4">
      <div className="flex items-center">
        <input
          {...register('message')}
          placeholder="Type your message"
          className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center"
        >
          <IoSend className="mr-2" />
          Send
        </button>
      </div>
    </form>
  );
};

export default ChatForm;