import React from 'react';
import { blackTheme } from '../../theme';
import './style.css';

const onMouseEnter = (event, color, bgColor) => {
    const el = event.target;
    el.style.color = color;
    el.style.backgroundColor = bgColor;
};

const onMouseOut = (event, color, bgColor) => {
    const el = event.target;
    el.style.color = color;
    el.style.backgroundColor = bgColor;
};

export default function Button({ text, className, onClick, theme }) {
    theme = blackTheme;
    return (
        <div className={className}>
            <button
                type="button"
                className="main-button"
                style={{
                    color: theme.text,
                    backgroundColor: theme.body,
                    border: `solid 0px ${theme.text}`,
                }}
                onMouseEnter={(event) => onMouseEnter(event, theme.blue, theme.body)}
                onMouseOut={(event) => onMouseOut(event, theme.text, theme.body)}
                onBlur={() => {}}
                onClick={onClick}
            >
                {text}
            </button>
        </div>
    );
}
