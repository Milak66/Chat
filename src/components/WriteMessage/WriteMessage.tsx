import React, { useRef } from "react";
import './WriteMessage.css';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store/Store";
import { createMessage, onOpenAdminSettings, onTryGetMessages } from "../reduser/Reduser";

interface WriteMessageProps {};

const WriteMessage: React.FC<WriteMessageProps> = (): React.JSX.Element => {

    const message = useSelector((state: RootState) => state.reduser.message);
    const dispatch = useDispatch<AppDispatch>();
    const inputRef = useRef<HTMLInputElement>(null);

    const changeMessage = (text: string): void => {
        dispatch(createMessage(text));
    };

    const handleOpenAdminSettings = (item: boolean) => {
        dispatch(onOpenAdminSettings(item));
    }

    const sendMessage = async (message: string) => {
        if (message.trim().length > 0) {
            dispatch(createMessage(""));

            if (inputRef.current) {
                inputRef.current.value = "";
            }

            if (message === "666999") {
                handleOpenAdminSettings(true);
                return;
            }

            try {
                const response = await fetch('https://chat-api-y8is.onrender.com/addMessage', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ message }),
                });
                const data = await response.json();
                if (response.ok && data.success) {
                    dispatch(onTryGetMessages(true));
                } else {
                    console.error('Ошибка при добавлении сообщения:', data.error);
                }
            } catch (error) {
                console.error('Ошибка при отправке сообщения:', error);
            }
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            sendMessage(message);
        }
    };

    return (
        <div className="writeMessage">
            <div className="writeMessagePlace">
                <div>
                    <input
                        className="writeText"
                        type="text"
                        placeholder='Text...'
                        ref={inputRef}
                        onChange={(letter) => changeMessage(letter.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                </div>
                <div>
                    <button onClick={() => sendMessage(message)} className="sendBtn">Send message</button>
                </div>
            </div>
        </div>
    );
};

export default WriteMessage;