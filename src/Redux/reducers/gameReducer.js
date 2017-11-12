import { actionTypes } from "./../actionTypes";
import { mapCardToValue, calculateWinners } from "./../../Helpers/helpers";

const initalState = {
    autoPlay: false,
    roundEnd: false,
    isLoading: false,
    isGameStared: false,
    currentRound: 1,
    cardsOnTheTable: [],
    numberOfPlayers: 0,
    currentPlayerPlaying: 0,
    players: [],
    highestCard: 0,
    winners: null,
    roundWinner: null,
    roundTotal: 0
};

export default function gameReducer(state = initalState, action) {
    switch (action.type) {

        case actionTypes.GAME_IS_LOADING:
            return {...state, isLoading: true};

        case actionTypes.START_GAME:
            return {
                ...state,
                isGameStared: true,
                numberOfPlayers: parseInt(action.payload.numberOfPlayers),
                isLoading: false,
                currentRound: 1,
                highestCard: null,
                winners: null,
                roundWinner: null,
                cardsOnTheTable: [],
                players: [...action.payload.players]
            };

        case actionTypes.CARD_PLAYED:
            const card = state.players[state.currentPlayerPlaying].cards[action.cardIndex];
            const cardValue = isNaN(card.value) ? mapCardToValue(card.value) : card.value;

            let highestCard = state.highestCard;
            let roundWinner = state.roundWinner;
            let currentPlayerPlaying = state.currentPlayerPlaying;

            if (!state.highestCard || state.highestCard < cardValue){

                highestCard = cardValue;
                roundWinner = currentPlayerPlaying
            } else if (state.highestCard == cardValue) {
                roundWinner = currentPlayerPlaying
            }

            let roundTotal = state.roundTotal;

            const activeCards = state.players[currentPlayerPlaying].cards.filter((card, i)=>{
               if (action.cardIndex != i) return card
            });
            return {
                ...state,
                autoPlay: true,
                cardsOnTheTable: [...state.cardsOnTheTable, state.players[currentPlayerPlaying].cards[action.cardIndex]],
                ...state.players[currentPlayerPlaying].cards[action.cardIndex].isPlayed = true,
                ...state.players[currentPlayerPlaying].cards = activeCards,
                currentPlayerPlaying: currentPlayerPlaying + 1,
                highestCard: parseInt(highestCard),
                roundWinner: roundWinner,
                roundTotal: roundTotal + parseInt(cardValue)
            };

        case actionTypes.START_ROUND:
            return {
                ...state,
                roundEnd: false,
                autoPlay: false,
                currentPlayerPlaying: 0,
                cardsOnTheTable: [],
                highestCard: null,
                winners: null,
                currentRound: state.currentRound + 1
            };

        case actionTypes.END_ROUND:

            let totalCards = state.players[state.roundWinner].totalCardsTaken;
            totalCards += 4;

            let totalScore = state.players[state.roundWinner].totalScore;
            totalScore+= state.roundTotal;

            const isLastRound  = state.currentRound === 10;

            let tmpState = {
                ...state,
                ...state.players[state.roundWinner].totalScore = totalScore,
                ...state.players[state.roundWinner].totalCardsTaken = totalCards,
                roundWinner: state.roundWinner + 1
            };

            if (isLastRound) {
                const winners = calculateWinners(state.numberOfPlayers, totalScore, state.roundWinner, state.players);

                tmpState = {
                    ...tmpState,
                    gameEnd: true,
                    winners: winners
                };
            } else {
                tmpState = {
                    ...tmpState,
                    roundEnd: true,
                    roundTotal: 0
                };
            }

            return tmpState;

        case actionTypes.RESET_GAME:
            return {
                ...initalState
            };

        default:
            return state
    }
}
