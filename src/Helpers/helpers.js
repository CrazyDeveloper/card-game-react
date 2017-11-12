export function mapCardToValue(cardVal) {
  const cardMap = {
    "ACE": 11,
    "JACK": 12,
    "QUEEN": 13,
    "KING": 14,
  };

  return cardMap[cardVal];
}

export function calculateWinners(numberOfPlayers, totalScore, roundWinner, players) {
  let score = 0;
  let winners = [];
  for (let i  = 0; i < numberOfPlayers; i++) {
      let playerScore = players[i].totalScore;

      if (roundWinner === i) {
          playerScore = totalScore;
      }

      if (playerScore > score) {
          score = playerScore;
          winners = [];
          winners.push(
              {
                  playerID: i + 1,
                  score: score
              })

      } else if (playerScore === score) {
          winners.push(
              {
                  playerID: i + 1,
                  score: score
              })
      }
  }

  return winners;
}