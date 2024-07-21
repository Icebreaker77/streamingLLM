import {useCallback} from 'react';
import {Message} from '../types';
import {useMessages} from '../context/MessagesContext';

const useSendMessage = () => {
    const {messages, addMessage, updateLastAssistantMessage} = useMessages();

    const sendMessage = useCallback(
        async (input: string) => {
            if (input.trim() === '') return;

            const userMessage: Message = {
                role: 'user',
                content: input,
                timestamp: new Date().toString(),
            };
            addMessage(userMessage);

            try {
                const response = await fetch('https://api.openai.com/v1/chat/completions', {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        model: 'gpt-4',
                        messages: [...messages, userMessage],
                        stream: true,
                    }),
                });

                const reader = response.body?.getReader();
                const decoder = new TextDecoder('utf-8');

                if (!reader) {
                    throw new Error('Reader not available');
                }

                let done = false;
                let buffer = '';
                let assistantContent = '';
                const assistantMessage: Message = {
                    role: 'assistant',
                    content: '',
                    timestamp: new Date().toString(),
                };
                addMessage(assistantMessage);

                while (!done) {
                    const {value, done: doneReading} = await reader.read();
                    done = doneReading;
                    buffer += decoder.decode(value, {stream: true});

                    let chunkEnd = buffer.indexOf('\n');
                    while (chunkEnd !== -1) {
                        const chunk = buffer.slice(0, chunkEnd);
                        buffer = buffer.slice(chunkEnd + 1);

                        if (chunk.trim() === '') {
                            chunkEnd = buffer.indexOf('\n');
                            continue;
                        }

                        if (chunk === 'data: [DONE]') {
                            done = true;
                            break;
                        }

                        if (chunk.startsWith('data: ')) {
                            const jsonString = chunk.slice(6);
                            try {
                                const parsed = JSON.parse(jsonString);
                                const delta = parsed.choices[0].delta?.content;
                                if (delta) {
                                    assistantContent += delta;
                                    updateLastAssistantMessage(assistantContent);
                                }
                            } catch (error) {
                                console.error('Error parsing JSON:', error);
                            }
                        }

                        chunkEnd = buffer.indexOf('\n');
                    }
                }
            } catch (error) {
                console.error('Error sending message:', error);
            }
        },
        [messages, addMessage, updateLastAssistantMessage]
    );

    return sendMessage;
};

export default useSendMessage;
