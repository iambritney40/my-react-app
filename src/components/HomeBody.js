import React, { useContext } from 'react';
import { Col, Row } from 'react-bootstrap';
import { FaBitcoin, FaMoneyCheck } from 'react-icons/fa';
import FormButton from './FormButton';
import { ChatContext } from '../context/ChatContext';
import { MODES } from '../constants';

const Body = ({ disabled = false }) => {
    const chatContext = useContext(ChatContext);
    return (
        <Row className="home-container">
            <Col lg={4}>
                <h1 className="form_title ps-5 pb-5 text-white">¿Qué deseas?</h1>
            </Col>
            <Col lg={4} className="text-center">
                <div className="form_img">
                    <img src="./assets/images/bg_2.png" alt="image_not_found" />
                </div>
            </Col>
            <Col className="text-end">
                <div className="h-100 py-5 d-flex justify-content-center align-items-center">
                    <FormButton
                        onClick={() => {
                            if (chatContext.visible.value) return;
                            chatContext.visible.set(true);
                            chatContext.mode.set(MODES.COMPRAR);
                        }}
                        icon={FaBitcoin}
                    >
                        comprar
                    </FormButton>
                    <FormButton
                        onClick={() => {
                            if (chatContext.visible.value) return;
                            chatContext.visible.set(true);
                            chatContext.mode.set(MODES.VENDER);
                        }}
                        icon={FaMoneyCheck}
                    >
                        vender
                    </FormButton>
                </div>
            </Col>
        </Row>
    );
};

export default Body;
