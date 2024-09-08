import React, { useState } from 'react';
import '../Styling/Chat-box.css';
import MessageSubmit from './MessageSubmit';
import axios from 'axios';

type ConversationMessage = {
    text: string;
    role: 'user' | 'chatbot';
};

const PORT = import.meta.env.VITE_PORT
console.log(PORT);

const ChatBox: React.FC = () => {
    // const [message, setMessage] = useState('');
    const [conversation, setConversation] = useState<ConversationMessage[]>([]);
    const sendMessage = async (message: string) => {
        try {
            const res = await axios.post('/api/chatbot', { message });
            const botMessage = res.data.message;
            setConversation((prevConversation) => [
                ...prevConversation,
                { text: message, role: 'user' },
                { text: botMessage, role: 'chatbot' },
            ]);
        } catch (error) {
            console.error('Error sending message:', error);
      }
    };
    const handleSubmit = async (message: string) => {
        setConversation((prevConversation) => [
            ...prevConversation,
            { text: message, role: 'user' },
        ]);
        await sendMessage(message);
    };

    return (
        <div id='chat-box'>
            <div id="conversation-display">
                {conversation.map((message, index) => (
                    <div key={index} className={`message ${message.role}`}>
                        {message.text}
                    </div>
                ))}
            </div>
            <MessageSubmit handleSubmit={handleSubmit} />
        </div>
    );
};

export default ChatBox;