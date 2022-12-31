import React, { useContext, useEffect } from 'react';
import { Else, If, Then, When } from 'react-if';
import Header from '../../components/Header';
import HomeContent from '../../components/home-content';
import { ChatContext } from '../../context/ChatContext';
import ChatWidgetComprar from '../../components/ChatWidgetComprar';
import ChatWidgetVender from '../../components/ChatWidgetVender';
import { MODES } from '../../constants';

const Home = () => {
    const chatContext = useContext(ChatContext);

    useEffect(
        () => () => {
            chatContext.visible.set(false);
        },
        []
    );

    return (
        <div style={{ minHeight: '100vh' }} className="position-relative">
            <div>
                <Header />
                <HomeContent />
            </div>
            <When condition={chatContext.visible.value}>
                <If condition={chatContext.mode.value === MODES.COMPRAR}>
                    <Then>
                        <ChatWidgetComprar />
                    </Then>
                    <Else>
                        <ChatWidgetVender />
                    </Else>
                </If>
            </When>
        </div>
    );
};

export default Home;
