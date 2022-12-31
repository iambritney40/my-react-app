import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { AiOutlineClose, AiOutlinePaperClip, AiOutlinePlusCircle } from 'react-icons/ai';
import cls from 'classnames';
import { When } from 'react-if';
import cloneDeep from 'lodash.clonedeep';
import { useLocation, useNavigate } from 'react-router-dom';
import { PAYMENT_METHODS } from '../constants';
import Utils from '../Utils';
import { ChatContext } from '../context/ChatContext';
import Image from './Image';
import { SocketContext } from '../context/SocketContext';

const ChatWidgetLive = () => {
    const fileInputRef = useRef(null);
    const [message, setMessage] = useState('');
    const [allMessages, setAllMessages] = useState([]);
    const [file, setFile] = useState(null);
    const messageRefs = useRef([]);
    const chatContext = useContext(ChatContext);
    const { emitMessage, connected, listenMessages } = useContext(SocketContext);

    const location = useLocation();
    const navigate = useNavigate();

    const [params, setParams] = useState(new URLSearchParams(location.search));

    const username = useMemo(() => params.get('username'), [params]);
    const mode = useMemo(() => params.get('mode'), [params]);

    const handleChangeMessage = (event) => setMessage(event.target.value);

    const selectFile = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSendMessage = () => {
        const $allMessages = cloneDeep(allMessages);

        const $msgObject = { text: message };

        if (file) {
            $msgObject.file = {
                body: file,
                type: file.type,
                name: file.name,
            };
            setFile(null);
        }

        $allMessages.push({ message: $msgObject, from: username?.toUpperCase() });

        emitMessage($msgObject);

        setAllMessages($allMessages);
        setMessage('');
    };

    const handleExit = () => {
        chatContext.visible.set(false);
        navigate('/');
    };

    useEffect(() => {
        if (connected && username === 'user') {
            console.log(username);
            const $allMessages = cloneDeep(allMessages);
            $allMessages.push({
                message: { text: 'espere un momento mientras se revisa su solicitud, no cierre la pagina' },
                from: 'support',
            });
            setAllMessages($allMessages);
        }
    }, [connected]);

    useEffect(() => {
        let detach = null;

        if (connected) {
            // eslint-disable-next-line no-const-assign
            detach = listenMessages(($data) => {
                if (username !== $data.username) {
                    const $allMessages = cloneDeep(allMessages);
                    $allMessages.push({
                        message: $data.message,
                        from: $data.username,
                    });
                    setAllMessages($allMessages);
                }
            });
        }

        return () => {
            if (detach) detach();
        };
    }, [connected, listenMessages, username, allMessages.length]);

    useEffect(() => {
        if (allMessages.length) {
            const lastMessage = messageRefs.current[messageRefs.current.length - 1];
            lastMessage?.scrollIntoView();
        }
    }, [allMessages.length]);

    const checkClassNames = ($chat) => {
        if ($chat.from === 'user' && mode === 'comprar') {
            return 'comprar';
        }

        if ($chat.from === 'support' && mode === 'comprar') {
            return 'vender';
        }

        if ($chat.from === 'user' && mode === 'vender') {
            return 'vender';
        }

        if ($chat.from === 'support' && mode === 'comprar') {
            return 'comprar';
        }
    };
    return (
        <div className="ChatWidget">
            <div className="ChatWidget__header">
                <div className="ChatWidget__header-title">Chat</div>
                <button type="button" onClick={handleExit} className="ChatWidget__header-close-button">
                    <AiOutlineClose />
                </button>
            </div>
            <ul className="ChatWidget__messages">
                {allMessages.map(($chat, $index) => (
                    <li
                        key={`message-${$index}`}
                        ref={($ref) => (messageRefs.current[$index] = $ref)}
                        className={cls('ChatWidget__message appeared', {
                            left: $chat.from !== username?.toUpperCase(),
                            right: $chat.from === username?.toUpperCase(),
                        })}
                    >
                        <div className={`ChatWidget__message-avatar ${checkClassNames($chat)}`} />
                        <div className="ChatWidget__message-text-wrapper">
                            <div className="ChatWidget__message-text">{$chat.message.text}</div>
                            {$chat.message.file && <Image {...$chat.message.file} />}
                        </div>
                    </li>
                ))}
            </ul>
            <form onSubmit={(event) => event.preventDefault()} className="ChatWidget__action-bar">
                <button
                    type="button"
                    disabled={file}
                    className="ChatWidget__action-bar-attachment"
                    onClick={() => fileInputRef.current.click()}
                >
                    <AiOutlinePaperClip />
                </button>
                <When condition={file}>
                    <button
                        type="button"
                        className="ChatWidget__action-bar-remove-attachment"
                        onClick={() => setFile(null)}
                    >
                        <AiOutlineClose />
                    </button>
                </When>
                <div className="ChatWidget__action-bar-input-wrapper">
                    <input
                        className="ChatWidget__action-bar-input"
                        placeholder="Type your message here..."
                        value={message}
                        onChange={handleChangeMessage}
                    />
                </div>
                <input
                    ref={fileInputRef}
                    className="ChatWidget__action-bar-attachment-native"
                    onChange={selectFile}
                    type="file"
                />
                <button
                    type="submit"
                    className="ChatWidget__button ChatWidget__button--success"
                    onClick={handleSendMessage}
                >
                    Send
                </button>
            </form>
        </div>
    );
};

export default ChatWidgetLive;
