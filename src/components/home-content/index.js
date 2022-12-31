import React from 'react';
import './style.css';
import Button from '../button';
import BannerImage from '../banner-image';
import { ChatContext } from '../../context/ChatContext';
import { MODES } from '../../constants';

export default function HomeContent() {
    const chatContext = React.useContext(ChatContext);

    const purchaseButtonClickedHandler = () => {
        if (chatContext.visible.value) return;
        chatContext.visible.set(true);
        chatContext.mode.set(MODES.COMPRAR);
    };

    const sellButtonClickedHandler = () => {
        if (chatContext.visible.value) return;
        chatContext.visible.set(true);
        chatContext.mode.set(MODES.VENDER);
    };

    return (
        <div className="greet-main" id="greeting">
            <div className="greeting-main">
                <div className="greeting-header-div">
                    <h1 className="form_title text-white">¿Qué deseas?</h1>
                </div>
                <div className="greeting-image-div">
                    <BannerImage />
                </div>
                <div className="greeting-text-div">
                    <div className="button-greeting-div">
                        <Button text="COMPRAR" onClick={purchaseButtonClickedHandler} />
                        <Button text="VENDER" onClick={sellButtonClickedHandler} />
                    </div>
                </div>
            </div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    paddingTop: '24px',
                    fontSize: '1.5rem',
                }}
            >
                CEO: Gabriel Mella
            </div>
        </div>
    );
}
