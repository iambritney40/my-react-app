import React, { useEffect, useState } from 'react';

const Image = ({ body, type, name }) => {
    const [imgSrc, setImgSrc] = useState(null);

    useEffect(() => {
        const blob = new Blob([body], { type });
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = function () {
            setImgSrc(reader.result);
        };
    }, [body]);

    return (
        <img
            src={imgSrc}
            className="ChatWidget__message-image"
            onClick={() => window.open(imgSrc, '_blank')}
            height="100px"
            alt={name}
        />
    );
};

export default Image;
