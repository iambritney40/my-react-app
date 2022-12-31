import { Component, createContext, useState } from 'react';
import { io } from 'socket.io-client';

export const SocketContext = createContext();

const useSocketContextValue = () => {
    const [_socket, setSocket] = useState(null);
    const [_connected, setConnected] = useState(false);

    const socket = ($socket) => {
        if ($socket !== undefined) {
            setSocket($socket);
            return;
        }

        return _socket;
    };

    const connected = ($connected) => {
        if ($connected !== undefined) {
            setConnected($connected);
            return;
        }

        return _connected;
    };

    const handleError = ($err) => {
        console.error('Error establishing socket connection', $err);
        connected(false);
    };

    const establishConnection = ({ username, room }) => {
        console.log('Establishing connection');
        const url = `${process.env.REACT_APP_BASE_URL}:8081`;
        const $socket = io(url);

        $socket.on('connect', () => {
            console.log(`Established connection at ${url}`);
            connected($socket.connected);

            console.log('Emitting joinRoom event');
            $socket.emit('joinRoom', { username, room });

            socket($socket);
        });
        console.log($socket);

        $socket.on('error', handleError);
        $socket.on('connect_error', handleError);
        $socket.on('connect_failed', handleError);

        return $socket;
    };

    const emitMessage = ($msg) => {
        if (!_socket) {
            console.error('No socket instance found to emit from');
            return;
        }

        console.log('Emitting chatMessage event', $msg);
        _socket.emit('chatMessage', $msg);
    };

    const listenMessages = (listener) => {
        if (!_socket) {
            console.error('No socket instance found to listen to');
            return;
        }
        console.log('Listening to message event');
        _socket.on('message', listener);

        const detach = () => {
            console.log('Detaching from message event');
            _socket.off('message', listener);
        };

        return detach;
    };

    const terminateConnection = ($instance) => {
        if ($instance) {
            $instance.close();
            return;
        }

        if (!_socket) {
            console.error('No socket instance found to terminate');
            return;
        }

        console.log('Terminating socket connection');
        _socket.close();
        socket(null);
    };

    return { connected: _connected, establishConnection, emitMessage, listenMessages, terminateConnection };
};

export const SocketContextWrapper = ({ children }) => {
    const socketContextValue = useSocketContextValue();
    return <SocketContext.Provider value={socketContextValue}>{children}</SocketContext.Provider>;
};
