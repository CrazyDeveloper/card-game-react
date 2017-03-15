import fetch from "isomorphic-fetch";
import {actionTypes} from "./../actionTypes";

export function startGame(numberOfPlayers) {
    return (dispatch) => {
        dispatch(gameIsLoading());
        getDeck()
            .then(response => response.json())
            .then(jsonResp => dispatch(mapPlayers(jsonResp, numberOfPlayers)))
    }
}

export function reStartGame(numberOfPlayers) {
    return (dispatch) => {
        dispatch({
            type: actionTypes.RESET_GAME
        });
        dispatch(startGame(numberOfPlayers))
    }
}


export function gameIsLoading() {
    return {
        type: actionTypes.GAME_IS_LOADING
    }
}

export function gameReady(payload) {
    return {
        type: actionTypes.START_GAME,
        payload
    }
}

export function mapPlayers(deckObj, numberOfPlayers) {
    return dispatch => {
        let returnedData = [];

        for (let i = 1; i <= numberOfPlayers; i++) {

            getCards(deckObj.deck_id, function (response) {
                returnedData.push({
                    playerId: i,
                    totalCardsTaken: 0,
                    totalScore: 0,
                    ...response
                });

                if (i == numberOfPlayers) {
                    const gameObj = {players: returnedData, numberOfPlayers};
                    dispatch(gameReady(gameObj))
                }
            });
        }
    }
}

export function playerPlayed(cardIndex) {
    return dispatch => {
        dispatch(cardPlayed(cardIndex));
        dispatch(startAutoPlay())
    }
}

export function startAutoPlay() {

    return (dispatch, getState) => {
        const currentState = getState();
        const toBePlayed = currentState.gameReducer.numberOfPlayers;

        for (let i = 2; i <= toBePlayed; i++) {
            const cardIndex = Math.floor(Math.random() * currentState.gameReducer.players[0].cards.length);
            let interval = 500;

            setTimeout(() => {
                if (currentState.gameReducer.numberOfPlayers === i) {
                    dispatch(cardPlayed(cardIndex));
                    setTimeout(() => {
                        dispatch(endRound(cardIndex))
                    }, 1000);

                } else {
                    dispatch(cardPlayed(cardIndex))
                }
            }, interval + (i * 500));
        }
    }
}

export function startRound() {

    return {
        type: actionTypes.START_ROUND
    }
}

function endRound() {
    return dispatch => {
        dispatch({
            type: actionTypes.END_ROUND
        })
    }
}

function getDeck() {
    return fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
}

function getCards(deckId, callback) {
    return fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=10`).then(response => response.json()).then(jsonResp => callback(jsonResp));
}

function cardPlayed(cardIndex) {
    return {
        type: actionTypes.CARD_PLAYED,
        cardIndex
    }
}

function getNextCard() {
    const cardIndex  = Math.floor(Math.random() * 10);
}
