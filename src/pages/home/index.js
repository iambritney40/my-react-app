import React, { useContext, useEffect } from 'react';
import { Else, If, Then, When } from 'react-if';
import HomeBody from '../../components/HomeBody';
import Header from '../../components/Header';
import { ChatContext } from '../../context/ChatContext';
import ChatWidgetComprar from '../../components/ChatWidgetComprar';
import ChatWidgetVender from '../../components/ChatWidgetVender';
import { MODES } from '../../constants';

const Home = () => {
    const chatContext = useContext(ChatContext);

    useEffect(() => {
        const fillter = null;
        return () => {
            chatContext.visible.set(false);
        };
    }, []);

    return (
        <div className="wrapper position-relative">
            <div className="container-fluid px-5">
                <Header />
                <HomeBody />
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
