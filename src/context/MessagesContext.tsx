import {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import {Message} from '../types';

interface MessagesContextType {
    messages: Message[];
    addMessage: (message: Message) => void;
    updateLastAssistantMessage: (content: string) => void;
    clearMessages: () => void;
}

const MessagesContext = createContext<MessagesContextType | undefined>(undefined);

export const MessagesProvider = ({children}: { children: ReactNode }) => {
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
                if (!lastMessage.content.includes(content)) {
                    lastMessage.content = content;
                }
            }

            return newMessages;
        });
    };

    const clearMessages = () => {
        setMessages([]);
        localStorage.removeItem('messages');
    };

    return (
        <MessagesContext.Provider value={{messages, addMessage, updateLastAssistantMessage, clearMessages}}>
            {children}
        </MessagesContext.Provider>
    );
};

export const useMessages = () => {
    const context = useContext(MessagesContext);
    if (!context) {
        throw new Error('useMessages must be used within a MessagesProvider');
    }
    return context;
};
