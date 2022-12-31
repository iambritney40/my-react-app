import { createContext, useState } from 'react';

export const ChatContext = createContext();

const useChatContextValue = () => {
    const [visible, setVisible] = useState(false);
    const [mode, setMode] = useState(null);
    return { visible: { set: setVisible, value: visible }, mode: { set: setMode, value: mode } };
};

export const ChatContextWrapper = ({ children }) => {
    const chatContextValue = useChatContextValue();
    return <ChatContext.Provider value={chatContextValue}>{children}</ChatContext.Provider>;
};
