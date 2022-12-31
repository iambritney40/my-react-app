import React, { useContext } from 'react';
import { ChatContext } from '../context/ChatContext';

const FormButton = ({ icon: Icon, children, ...rest }) => {
    const chatContext = useContext(ChatContext);

    return (
        <button
            disabled={chatContext.visible.value}
            type="button"
            className="js-btn-prev form-button form-button--is-disabled rounded-pill text-uppercase"
            {...rest}
        >
            {Icon && <Icon className="form-button__icon" />}
            {children}
        </button>
    );
};

export default FormButton;
