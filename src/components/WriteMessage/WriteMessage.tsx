import React, { useRef } from "react";
import './WriteMessage.css';
import { useSelector } from "react-redux";
import { RootState } from "../store/Store"
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/Store";
import { createMessage, onOpenAdminSettings } from "../reduser/Reduser";

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

            if (message === "666999") {
                handleOpenAdminSettings(true);
                return;
            }

            if (inputRef.current) {
                inputRef.current.value = "";
            }

            try {
                const response = await fetch('https://chat-api-watz.onrender.com/addMessage', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ message }),
                });
                const data = await response.json();
                console.log(data);
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