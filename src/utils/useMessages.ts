/*
import {useEffect, useState} from 'react';
import {Message} from '../types';

const useMessages = () => {
    const [messages, setMessages] = useState<Message[]>(() => {
        const savedMessages = localStorage.getItem('messages');
        return savedMessages ? JSON.parse(savedMessages) : [];
    });


    useEffect(() => {
        localStorage.setItem('messages', JSON.stringify(messages));
    }, [messages]);

    const addMessage = (message: Message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
    };

    const updateLastAssistantMessage = (content: string) => {
        setMessages((prevMessages) => {
            const newMessages = [...prevMessages];
            const lastMessage = newMessages[newMessages.length - 1];

            if (lastMessage && lastMessage.role === 'assistant') {
                lastMessage.content += content;
            }

            return newMessages;
        });
    };

    const clearMessages = () => {
        setMessages([]);
        localStorage.removeItem('messages');
    };

    return {messages, addMessage, updateLastAssistantMessage, clearMessages};
};

export default useMessages;
*/
