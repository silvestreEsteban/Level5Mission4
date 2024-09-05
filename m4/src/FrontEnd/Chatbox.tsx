import { useState } from 'react';
import '../Styling/Chatbox.css'

type ConversationMessage = {
    text: string;
    role: 'user' | 'chatbot'
}

const Chatbox: React.FC = () => {
    const [conversation, setConversation] = useState<ConversationMessage[]>([{
        text: `I'm an insurance chatbot. I can help you with your insurance needs. How can I help you today?`, role: 'chatbot'
    }]);
    
    
    return (
        <div id='chat-box'>
            <div id="conversation-display">
                {conversation.map((message, index) => (
                    <div key={index} className={`message ${message.role}`}>
                        {message.text}
                    </div>
                ))}
       
            </div>
        </div>
    )
}

export default Chatbox;