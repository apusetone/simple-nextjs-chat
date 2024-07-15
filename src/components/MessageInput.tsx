"use client";

import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import Textarea from '@mui/joy/Textarea';
import { Stack } from '@mui/joy';

import SendRoundedIcon from '@mui/icons-material/SendRounded';

export type MessageInputProps = {
  ws: WebSocket | null;
  addMessage: (message: { message: string; connection_id: string }) => void;
};

export default function MessageInput({ ws, addMessage }: MessageInputProps) {
  const [textAreaValue, setTextAreaValue] = React.useState('');
  const textAreaRef = React.useRef<HTMLDivElement>(null);

  const handleSubmit = () => {
    if (ws && textAreaValue.trim() !== '') {
      ws.send(textAreaValue);
      addMessage({ message: textAreaValue, connection_id: 'local' });
      setTextAreaValue('');
    }
  };

  return (
    <Box sx={{ px: 2, pb: 3 }}>
      <FormControl>
        <Textarea
          placeholder="Type something here…"
          aria-label="Message"
          ref={textAreaRef}
          onChange={(e) => {
            setTextAreaValue(e.target.value);
          }}
          value={textAreaValue}
          minRows={3}
          maxRows={10}
          endDecorator={
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              flexGrow={1}
              sx={{
                py: 1,
                pr: 1,
                borderTop: '1px solid',
                borderColor: 'divider',
              }}
            >
              <div />
              <Button
                size="sm"
                color="primary"
                sx={{ alignSelf: 'center', borderRadius: 'sm' }}
                endDecorator={<SendRoundedIcon />}
                onClick={handleSubmit}
              >
                Send
              </Button>
            </Stack>
          }
          onKeyDown={(event) => {
            if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) {
              handleSubmit();
            }
          }}
          sx={{
            '& textarea:first-of-type': {
              minHeight: 72,
            },
          }}
        />
      </FormControl>
    </Box>
  );
}