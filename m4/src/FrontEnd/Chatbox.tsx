import React, { useState } from 'react';
import '../Styling/Chat-box.css';
import MessageSubmit from './MessageSubmit';
import axios from 'axios';

type ConversationMessage = {
    text: string;
    role: 'user' | 'chatbot';
};

const ENDPOINT = import.meta.env.VITE_LOCAL_ENDPOINT;

const ChatBox: React.FC = () => {
    const [conversation, setConversation] = useState<ConversationMessage[]>([{
          text: `Hi, my name is Tina. I'm here to help you choose the right insurance for your vehicle. May I ask you some personal questions?`, role: 'chatbot'
    }]);
   
    

    const handleSubmit = async (message: string) => {
        setConversation((prevConversation) => [
            ...prevConversation,
            { text: message, role: 'user' },
        ]);

        try {
            const response = await axios.post(`${ENDPOINT}/api/chatbot`, { prompt: message})
            const chatbotResponse = response.data.response;

            setConversation((prevConversation) => [
                ...prevConversation,
            {text: chatbotResponse, role: 'chatbot'}, 
            ]);
        } catch (error) {
            console.error('Error sending message to the chatbot:', error);
        }
        
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