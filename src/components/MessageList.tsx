import React from 'react';
import {Box} from '@mantine/core';
import MessageBox from './MessageBox.tsx';
import {Message} from '../types';

interface MessageListProps {
    messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({messages}) => {
    return (
        <Box style={{padding: '10px'}}>
            {messages.map((message, index) => (
                <MessageBox key={index} message={message}/>
            ))}
        </Box>
    );
};

export default MessageList;
