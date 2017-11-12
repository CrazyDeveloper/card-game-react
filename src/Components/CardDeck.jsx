import React, {PropTypes} from "react";

const CardDeck = ({ cards }) => {
    return (
        <div className="card-deck">
            { cards }
        </div>
    );
};

CardDeck.propTypes = {
    cards: PropTypes.array,
};
export default CardDeck;
