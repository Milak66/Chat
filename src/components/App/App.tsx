import React from "react";
import './App.css';
import Start from "../Start/Start";
import MainContent from "../MainContent/MainContent";
import WriteMessage from "../WriteMessage/WriteMessage";
import { useSelector } from "react-redux";
import { RootState } from "../store/Store";

interface AppProps {};

const App: React.FC<AppProps> = (): React.JSX.Element => {

    const isAdminSettingsOpen = useSelector((state: RootState) => state.reduser.isAdminSettingsOpen);

    return (
        <div className="app">
            <div className="chat">
            {isAdminSettingsOpen ? <Start/> : null}
            <div></div>
                <MainContent/>
                <WriteMessage/>
            </div>
        </div>
    )
}

export default App;