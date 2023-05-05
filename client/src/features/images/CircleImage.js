import React from 'react';


export const CircleImage = ({ size, imageSrc }) => {
    const imageStyle = {
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
        objectFit: 'cover',
        border: `2px solid black`,
        boxSizing: 'border-box',
    };

    return (
        <div>
            <img src={imageSrc} style={imageStyle} alt="Circle" />
        </div>
    );
};





