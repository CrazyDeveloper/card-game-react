import React, {PropTypes} from "react";

const PlayerInfo = ({position, score}) => {
    return (
        <div className='player-info'>
            <h3>Player { ++position }</h3>
            <p className='score'>Score: {score }</p>
        </div>
    );
};

PlayerInfo.propTypes = {
    position: PropTypes.number.isRequired,
    score: PropTypes.number.isRequired
};
export default PlayerInfo;
