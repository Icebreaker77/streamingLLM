import React from 'react';
import {Box, Text as MantineText} from '@mantine/core';
import {Message} from '../types';

interface MessageBoxProps {
    message: Message;
}

const MessageBox: React.FC<MessageBoxProps> = ({message}) => {
    return (
        <Box
            style={{
                padding: '0',
                backgroundColor: message.role === 'user' ? 'oklch(100% 0 0)' : 'oklch(95% 0.1 150)',
                borderRadius: '5px',
                margin: '10px 0',
                border: message.role === 'assistant' ? '1px solid transparent' : '1px solid oklch(24.78% 0 0)',
                backgroundImage: message.role === 'assistant' ? 'linear-gradient(white, white), linear-gradient(to right, purple, red)' : 'none',
                backgroundOrigin: 'border-box',
                backgroundClip: message.role === 'assistant' ? 'content-box, border-box' : 'none'
            }}
        >
            <MantineText
                size="sm"
                style={{
                    display: 'flex',
                    alignSelf: 'flex-end',
                    marginInlineStart: '1rem',
                    fontWeight: 'bold'
                }}
            >
                {message.role === 'user' ? 'User Name' : 'Large Language Model'} {message.timestamp}
            </MantineText>
            <MantineText style={{padding: '1rem', textAlign: 'justify'}}>{message.content}</MantineText>
        </Box>
    );
};

export default MessageBox;
