import React from "react";

const Card = ({image, clickCallback, index}) => {
    return (
        <div className='card grow'
             onClick={clickCallback.bind(this, index)}>
            <img src={image} alt="playing card"/>
        </div>
    )
};

export default Card;
