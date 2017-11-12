import React, {PropTypes} from "react";

const Button = ({text, onClickCallback}) => {
    return (
        <button type="button"
                className="button-regular button btn-full-w m-b-m pill"
                onClick={ onClickCallback }> 
                { text }
        </button>
    );
};

Button.propTypes = {
    text: PropTypes.string.isRequired,
    onClickCallback: PropTypes.func
};
export default Button;
