import { useState } from 'react';
import '../Styling/Message-submit.css';

interface ChatBoxProps {
    handleSubmit: (message: string) => void;
}

const MessageSubmit: React.FC<ChatBoxProps> = ({ handleSubmit }) => {
    const [message, setMessage] = useState('');

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleSubmit(message);
        setMessage('');
    };

    return (
        <div>
            <form id='message-input-form' onSubmit={onSubmit}>
                <input
                    type="text"
                    id="message-input"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                />
                <button id="submit-button">Send</button>
            </form>
        </div>
    );
};

export default MessageSubmit;