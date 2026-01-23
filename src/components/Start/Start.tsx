import React from "react";
import './Start.css';
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/Store";
import { onTryGetMessages } from "../reduser/Reduser";

interface StartProps {};

const Start: React.FC<StartProps> = (): React.JSX.Element => {

    const dispatch = useDispatch<AppDispatch>();

    const handleClearChat = async () => {
        try {
            const response = await fetch('https://chat-api-y8is.onrender.com/clearChat', {
                method: 'POST'
            });
            const data = await response.json();
            if (response.ok && data.success) {
                dispatch(onTryGetMessages(true));
            } else {
                console.error('Ошибка при добавлении сообщения:', data.error);
            }
        } catch (error) {
            console.error('Ошибка при отчищении чата:', error);
        }
    }

    return (
        <div className="start">
            <div className="menu">
                <div className="logoOfSettings">
                    Chat Settings
                </div>
                <div className="willBeAddedText">
                    Will be added
                </div>
                <div className="willBeAddedText">
                    Will be added
                </div>
                <div className="clearChat">
                    <button className="clearChatBtn" onClick={handleClearChat}>Clear chat</button>
                </div>
            </div>
        </div>
    )
}

export default Start;