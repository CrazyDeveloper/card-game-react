import React, {Component, PropTypes } from "react";
import {connect} from "react-redux";
import Player from "../Components/Player";
import Card from "../Components/Card";
import WinnerScreen from  "../Components/WinnerScreen";
import {playerPlayed, startRound, reStartGame} from "../Redux/actions/gameActions";

class PlayingTable extends Component {

    constructor(props) {
        super(props);
    }

    createPlayers() {
        const playerClasses = [
            "first", "second", "third", "fourth"
        ];


        return this.props.game.players.map((obj, index) => (
            <Player
                key={index}
                position={index}
                cards={obj.cards}
                score={obj.totalScore}
                current={this.props.game.currentPlayerPlaying}
                cardPlayedCallback={index === 0 ? this.props.cardPlayed : () => {
                    }}
                positionClassName={playerClasses[index]}/>
        ));
    }

    createPlayedCards() {
        return this.props.game.cardsOnTheTable.map((obj, i) => {

            return (
                <li key={obj.code}>
                    <Card
                        image={obj.image}
                        value={obj.value}
                        clickCallback={() => {
                        }}
                        index={i}
                    />
                </li>
            );
        });
    }

    generateRoundWinner() {
        return <WinnerScreen
            text={"Round Winner is PLAYER: " + this.props.game.roundWinner}
            buttonText={"Start next round"}
            callback={this.props.startRound}/>;

    }

    generateGameWinner() {
        const winners = this.props.game.winners;
        let winnerText = "",
            winnersLength = winners.length;

        if (winnersLength > 1) {
            winnerText = "Winners are PLAYERS: ";
            for (let i = 0; i < winners.length; i++) {
                winnerText += `${winners[i].playerID}, and score: ${winners[i].score}\n`;
            }
        } else {
            winnerText = `Winner is PLAYER: ${winners[0].playerID}, with score: ${winners[0].score}`;
        }

        return <WinnerScreen
            text={winnerText}
            buttonText={"Restart the game"}
            callback={this.props.reStartGame.bind(this, this.props.game.numberOfPlayers)}/>;

    }

    generatePlayingTable(playedCards) {

        return (
            <div className="playing-table center-vertical-horizontal">
                <ul>
                    {playedCards}
                </ul>
            </div>
        );
    }

    render() {

        const players = this.createPlayers();
        const playedCards = this.createPlayedCards();

        return (
            <div>
                {this.props.game.roundEnd ? this.generateRoundWinner() : ""}
                {this.props.game.gameEnd ? this.generateGameWinner() : ""}

                {this.props.game.isGameStared ? this.generatePlayingTable(playedCards) : ""}

                {players}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        game: state.gameReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        cardPlayed: (cardObj) => {
            dispatch(playerPlayed(cardObj));
        },
        startRound: () => {
            dispatch(startRound());
        },
        reStartGame: (totalPlayers) => {
            dispatch(reStartGame(totalPlayers));
        }
    };
};

PlayingTable = connect(
    mapStateToProps,
    mapDispatchToProps
)(PlayingTable);

export default PlayingTable;
