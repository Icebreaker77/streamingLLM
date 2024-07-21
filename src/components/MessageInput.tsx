import React from 'react';
import {Box, Button, Textarea} from '@mantine/core';
import SendIcon from '../assets/send.svg';

interface MessageInputProps {
    input: string;
    setInput: (value: string) => void;
    sendMessage: () => void;
}

const MessageInput: React.FC<MessageInputProps> = ({input, setInput, sendMessage}) => {
    return (
        <Box style={{display: 'flex', alignItems: 'center', position: 'relative'}}>
            <Textarea
                placeholder="Type your message here..."
                value={input}
                maxRows={2}
                autosize={false}
                styles={{
                    root: {
                        width: '100%',
                    },
                    input: {
                        borderRadius: '20px',
                        padding: '15px',
                        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                        border: '1px solid #ddd',
                        fontSize: '14px',
                        width: '95%',
                        maxWidth: '95%',
                    },
                }}
                onChange={(event) => setInput(event.currentTarget.value)}
                onKeyDown={(event) => {
                    if (event.key === 'Enter' && !event.shiftKey) {
                        event.preventDefault();
                        sendMessage();
                    }
                }}
            />
            <Button
                onClick={sendMessage}
                styles={{
                    root: {
                        borderRadius: '50%',
                        width: '40px',
                        height: '40px',
                        padding: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'absolute',
                        right: '2rem',
                        cursor: 'pointer',
                    },
                    label: {
                        display: 'flex',
                    }
                }}
            >
                <img src={SendIcon} alt="" style={{width: '18px', height: '18px'}}/>
            </Button>
        </Box>
    );
};

export default MessageInput;
