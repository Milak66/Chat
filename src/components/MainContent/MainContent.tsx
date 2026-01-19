import React, {useEffect} from "react";
import './MainContent.css';
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { ChatMessage, setUserChat } from "../reduser/Reduser";

interface MainContentProps {};
interface ChatGrettingProps {};
interface ChatWithUserProps {};

const ChatGretting: React.FC<ChatGrettingProps> = (): React.JSX.Element => {

    return (
        <div className="gretting">
            <div className="empty_chat_message">
               There are no messages yet
            </div>                
        </div>
    )
}

const ChatWithUser: React.FC<ChatWithUserProps> = () => {

    const userChat = useSelector((state: RootState) => state.reduser.userChat);

    const showChat = () => {
        return userChat.map((letter, index) => (
            <div className="userMessage" key={letter.id || index}>
                <span className="userLogo">User:</span>
                <div className="userText">{letter.message}</div>
            </div>
        ));
    };

    return (
        <div className="chatWithUser">
            {showChat()}
        </div>
    )
}

const MainContent: React.FC<MainContentProps> = () => {

    const userChat = useSelector((state: RootState) => state.reduser.userChat);

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        async function fetchMessages() {
            try {
                const response = await fetch('http://localhost:5999/messages');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const messages: ChatMessage[] = await response.json();
                console.log('Полученные сообщения:', messages);
                dispatch(setUserChat(messages));
            } catch (error) {
                console.error('Ошибка при получении сообщений:', error);
            }
        };
    
        fetchMessages();
    }, [userChat]);

    const typeOfChat = () => {
        if (userChat.length > 0) {
            return <ChatWithUser/>
        } else {
            return <ChatGretting/>
        }
    }

    return (
        <div className="main">
            {typeOfChat()}
        </div>
    )
}

export default MainContent;