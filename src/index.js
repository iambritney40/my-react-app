import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import App from './App';
import { chosenTheme } from './theme';
import { GlobalStyles } from './global';
import { ChatContextWrapper } from './context/ChatContext';
import { SocketContextWrapper } from './context/SocketContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ThemeProvider theme={chosenTheme}>
        <SocketContextWrapper>
            <ChatContextWrapper>
                <>
                    <GlobalStyles />
                    <App />
                </>
            </ChatContextWrapper>
        </SocketContextWrapper>
    </ThemeProvider>
);
