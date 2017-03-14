import React, { Component, PropTypes } from "react";
import Card from "./Card";
import PlayerInfo from "./PlayerInfo";

class Player extends Component {

    constructor() {
        super();
        this.cardBg = "./../src/assets/images/card_bg.png";
    }

    componentWillMount() {
        this.cards = this.generateCards(this.props.cards);
    }

    componentWillUpdate() {
        this.cards = this.generateCards(this.props.cards);
    }

    generateCards(cards) {
        return cards.map((obj, i) => {
            if (!obj.isPlayed) {
                return <Card
                    image={this.props.positionClassName === "first" ? obj.image : this.cardBg }
                    value={obj.value}
                    clickCallback={this.props.cardPlayedCallback}
                    index={i}
                    key={obj.code}/>;
            }
        });
    }

    render() {
        const {positionClassName, position, score, current} = this.props;

        return (
            <div className={`player  ${positionClassName }`}>

                <PlayerInfo position={position} score={score} current={current}/>

                <div className="card-deck">
                    {this.cards}
                </div>

            </div>
        );
    }
}

Player.propTypes = {
    cards:PropTypes.array.isRequired,
    position: PropTypes.number.isRequired,
    score: PropTypes.number.isRequired,
    cardPlayedCallback: PropTypes.func.isRequired,
    positionClassName: PropTypes.string.isRequired,
    current: PropTypes.number.isRequired
};

export default  Player;
