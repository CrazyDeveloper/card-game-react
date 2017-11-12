import React, {PropTypes } from "react";

const WinnerScreen = ({text, buttonText, callback}) => {
    return (
        <div className="round-winner overlay">
            <div className="center-vertical-horizontal">
                <h4>{text}</h4>
                <button className="btn-full-w button button-regular" type="button" onClick={callback}>
                    {buttonText}
                </button>
            </div>
        </div>
    );
};

WinnerScreen.propTypes = {
    buttonText:PropTypes.string.isRequired,
    callback: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired
};

export default WinnerScreen;
