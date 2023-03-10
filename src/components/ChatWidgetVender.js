import React, { useContext, useEffect, useRef, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import cls from 'classnames';
import { When } from 'react-if';
import cloneDeep from 'lodash.clonedeep';
import { useNavigate } from 'react-router-dom';
import { MODES, PAYMENT_METHODS } from '../constants';
import Utils from '../Utils';
import { ChatContext } from '../context/ChatContext';

const ChatWidgetVender = () => {
    const [message, setMessage] = useState('');
    const [currentCycle, setCurrentCycle] = useState(1);
    const [allMessages, setAllMessages] = useState([]);
    const messageRefs = useRef([]);
    const chatContext = useContext(ChatContext);

    const navigate = useNavigate();

    const [amount, setAmount] = useState(0);
    const [convertedAmount, setConvertedAmount] = useState(0);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

    const sendMessage = ($message, $from = 'SELLER') => {
        setAllMessages((prev) => [...prev, { message: $message, from: $from }]);
    };

    const handleChangeMessage = (event) => setMessage(event.target.value);
    const handleSendMessage = () => {
        if (currentCycle === 1) {
            if (!message || message === '0') {
                return;
            }
            setAmount(parseInt(message, 10));
        }

        const $allMessages = cloneDeep(allMessages);
        $allMessages.push({ message, from: 'BUYER' });

        setCurrentCycle(currentCycle + 1);
        setAllMessages($allMessages);
        setMessage('');
    };

    const handleSelectPaymentMethod = (paymentMethodValue) => () => {
        setSelectedPaymentMethod(paymentMethodValue);
        setCurrentCycle(currentCycle + 1);
    };

    const handleExit = () => {
        chatContext.visible.set(false);
    };

    const handleProceed = () => {
        const { support, user } = Utils.generateRoomLink(MODES.VENDER);
        Utils.sendTelegramMessage(
            `Alguien quiere comprar BTC por valor de  ${convertedAmount} d??lares. Con??ctese para tener un trato http://tusbtc.com${support}`
        );

        navigate(user);
    };

    useEffect(() => {
        switch (currentCycle) {
            case 1:
                sendMessage('??Cu??nto es la cantidad de BTC que desea vender en d??lares?');
                break;
            case 2:
                sendMessage('??Cu??l es el m??todo de pago en el que desea recibir');
                break;
            case 3: {
                const $convertedAmount = Utils.calculatedAmountVender(amount);
                setConvertedAmount($convertedAmount);
                sendMessage(`pagar??s ${$convertedAmount}. ??Quieres continuar m??s?`);
                break;
            }
            default:
                break;
        }
    }, [currentCycle]);

    useEffect(() => {
        if (allMessages.length) {
            const lastMessage = messageRefs.current[messageRefs.current.length - 1];
            lastMessage.scrollIntoView();
        }
    }, [allMessages.length]);

    const isInputDisabled = () => {
        if (currentCycle !== 1) return true;
        return false;
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
                {allMessages.map(($message, $index) => (
                    <li
                        key={`message-${$index}`}
                        ref={($ref) => (messageRefs.current[$index] = $ref)}
                        className={cls('ChatWidget__message appeared', {
                            left: $message.from === 'SELLER',
                            right: $message.from === 'BUYER',
                        })}
                    >
                        <div
                            className={`ChatWidget__message-avatar ${$message.from === 'SELLER' ? 'comprar' : 'you'}`}
                        />
                        <div className="ChatWidget__message-text-wrapper">
                            <div className="ChatWidget__message-text">{$message.message}</div>
                        </div>
                        <When condition={$index === 2}>
                            <div className="ChatWidget__buttons-wrapper">
                                {PAYMENT_METHODS.map(($method) => (
                                    <button
                                        key={`paymentMethod-${$method.value}`}
                                        className="ChatWidget__button ChatWidget__button--success"
                                        type="button"
                                        onClick={handleSelectPaymentMethod($method.value)}
                                    >
                                        {$method.label}
                                    </button>
                                ))}
                            </div>
                        </When>
                        <When condition={$index === 3}>
                            <div className="ChatWidget__buttons-wrapper">
                                <button
                                    className="ChatWidget__button ChatWidget__button--danger"
                                    type="button"
                                    onClick={handleExit}
                                >
                                    Exit
                                </button>
                                <button
                                    className="ChatWidget__button ChatWidget__button--success"
                                    type="button"
                                    onClick={handleProceed}
                                >
                                    Proceed
                                </button>
                            </div>
                        </When>
                    </li>
                ))}
            </ul>
            <form onSubmit={(event) => event.preventDefault()} className="ChatWidget__action-bar">
                <div className="ChatWidget__action-bar-input-wrapper">
                    <input
                        className="ChatWidget__action-bar-input"
                        placeholder="Type your message here..."
                        value={message}
                        type={currentCycle === 1 ? 'number' : 'text'}
                        disabled={isInputDisabled()}
                        onChange={handleChangeMessage}
                    />
                </div>
                <button
                    type="submit"
                    className="ChatWidget__button ChatWidget__button--success"
                    onClick={handleSendMessage}
                    disabled={isInputDisabled()}
                >
                    Send
                </button>
            </form>
        </div>
    );
};

export default ChatWidgetVender;
