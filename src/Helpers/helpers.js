export function mapCardToValue(cardVal) {
  const cardMap = {
    "ACE": 11,
    "JACK": 12,
    "QUEEN": 13,
    "KING": 14,
  };

  return cardMap[cardVal];
}
