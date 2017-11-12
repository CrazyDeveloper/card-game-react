import React from "react";
import { connect } from "react-redux";
import { startGame } from "../Redux/actions/gameActions";
import Button from '../Components/Button';
import Loader from '../Components/Loader';

let StartScreen = ({dispatch, props, startGame}) => {
    const hideFormClass = props.isLoading ? 'hidden' : '';

    if (!props.isGameStared) {
        return (
            <div className='overlay start-screen'>
                <div className="center-vertical-horizontal">
                    <div className={`player-selection ${hideFormClass}`}>
                        <h1 className="m-b-m">Welcome to Kingdom Clash</h1>
                        <p className="m-b-m">Choose between 2 to 4 players</p>
                        <Button text={"2 players"} onClickCallback={startGame.bind(this, 2)} />
                        <Button text={"3 players"} onClickCallback={startGame.bind(this, 3)} />
                        <Button text={"4 players"} onClickCallback={startGame.bind(this, 4)} />
                    </div>{ props.isLoading ? <Loader /> : null }
                </div>
            </div>
        )
    }
    return null;
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

export default StartScreen;
