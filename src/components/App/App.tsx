import React from "react";
import './App.css';
import { useEffect, useRef } from "react";
import Start from "../Start/Start";
import MainContent from "../MainContent/MainContent";
import WriteMessage from "../WriteMessage/WriteMessage";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";

interface AppProps {};

const App: React.FC<AppProps> = (): React.JSX.Element => {

    const isAdminSettingsOpen = useSelector((state: RootState) => state.reduser.isAdminSettingsOpen);
    
    const codeAnimation = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = codeAnimation.current;
        if (!container) return;
    
        const codes: HTMLDivElement[] = [];
    
        const createCodeDiv = () => {
          const code = document.createElement('div');
          code.className = 'code';
          code.textContent = Math.random() < 0.5 ? '0' : '1'; 
          code.style.position = 'absolute';
          code.style.left = '0px'; 
          code.style.top = `${Math.random() * (container.clientHeight - 20)}px`; 
          container.appendChild(code);
          codes.push(code);
        };
    
        const spawnInterval = setInterval(createCodeDiv, 300);
    
        const animate = () => {
          for (let i = codes.length - 1; i >= 0; i--) {
            const code = codes[i];
            const currentLeft = parseFloat(code.style.left);
            const newLeft = currentLeft + 2; 
            code.style.left = `${newLeft}px`;
    
            if (newLeft > container.clientWidth) {
              container.removeChild(code);
              codes.splice(i, 1);
            }
          }
    
          requestAnimationFrame(animate);
        };
    
        animate();
    
        return () => {
          clearInterval(spawnInterval);
          codes.forEach(code => container.removeChild(code));
        };
      }, []);

    return (
        <div className="app">
            <div className="chat">
            {isAdminSettingsOpen ? <Start/> : null}
                <div className="codePlace" ref={codeAnimation}></div>
                <MainContent/>
                <WriteMessage/>
            </div>
        </div>
    )
}

export default App;