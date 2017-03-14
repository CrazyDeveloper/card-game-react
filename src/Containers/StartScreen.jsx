import React from "react";
import {connect} from "react-redux";
import {startGame} from "../Redux/actions/gameActions";

let StartScreen = ({dispatch, props, startGame}) => {

    const hideFormClass = props.isLoading ? 'hidden' : '';

    if (!props.isGameStared) {

        return (

            <div className='overlay start-screen'>

                <div className="center-vertical-horizontal">

                    <div className={`player-selection ${hideFormClass}`}>

                        <h1 className="m-b-m">Welcome to Kingdom Clash</h1>

                        <p className="m-b-m">Choose between 2 to 4 players</p>

                        <button type="button"
                                className="button-regular button btn-full-w m-b-m pill"
                                onClick={startGame.bind(this, 2)}> 2 players
                        </button>
                        <button type="button"
                                className="button-regular button btn-full-w m-b-m pill"
                                onClick={startGame.bind(this, 3)}> 3 players
                        </button>
                        <button type="button"
                                className="button-regular button btn-full-w m-b-m pill"
                                onClick={startGame.bind(this, 4)}> 4 players
                        </button>

                    </div>
                    {
                        props.isLoading ? <div className="loader"></div> : ' '

                    }

                </div>
            </div>

        )
    } else {
        return (null)
    }
};

const mapStateToProps = (state) => {
    return {
        props: {
            isGameStared: state.gameReducer.isGameStared,
            isLoading: state.gameReducer.isLoading
        }
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        startGame: (totalPlayers) => {
            dispatch(startGame(totalPlayers))
        }
    }
};

StartScreen = connect(
    mapStateToProps,
    mapDispatchToProps,
)(StartScreen);

export default StartScreen
