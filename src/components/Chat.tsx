import {useEffect, useRef, useState} from 'react';
import {Button, Container, Group, ScrollArea} from '@mantine/core';
import ClearIcon from '../assets/clear.svg';
import MessageInput from "./MessageInput.tsx";
import MessageList from "./MessageList.tsx";
import useSendMessage from "../utils/useSendMessage.ts";
import {useMessages} from "../context/MessagesContext.tsx";

const Chat = () => {
    const {messages, clearMessages} = useMessages();
    const [input, setInput] = useState('');
    const sendMessage = useSendMessage();
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({behavior: 'smooth'});
        }
    }, [messages]);

    const handleSendMessage = () => {
        sendMessage(input);
        setInput('');
    };

    return (
        <Container size="xl" style={{display: 'flex', height: '100vh', padding: 0}}>
            <Group style={{height: '60px', margin: '2rem 0'}}>
                <Button
                    onClick={() => clearMessages()}
                    style={{
                        borderRadius: '50%',
                        width: '40px',
                        height: '40px',
                        padding: 0,
                        display: 'block',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        border: 'none',
                        background: 'transparent',
                    }}
                >
                    <img src={ClearIcon} alt="" style={{width: '20px', height: '20px'}}/>
                </Button>
            </Group>
            <ScrollArea style={{flex: 1, maxWidth: '50rem', margin: '0 auto'}}>
                <MessageList messages={messages}/>
                <div ref={bottomRef}/>
                <MessageInput input={input} setInput={setInput} sendMessage={handleSendMessage}/>
            </ScrollArea>

        </Container>
    );
};

export default Chat;
