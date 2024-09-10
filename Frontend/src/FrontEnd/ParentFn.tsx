import '../Styling/ParentFn.css';
import ChatBox from './Chatbox';

export default function ParentFn() {
    return (
        <div id='parent-function-div'>
            <div className='ai-text-chat-outer-shell'>
                <div className='ai-text-chat-inner-shell'>
                <h3>TURNERS CHATBOT</h3>
                    <div className='ai-text-chat-form'> 
                         <ChatBox />
                         
                    </div>
                </div>
            </div>
        </div>
    )
}