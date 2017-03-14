import keyMirror from "keymirror";

export const actionTypes = keyMirror(
    {
        START_GAME: null,
        END_GAME: null,
        END_ROUND: null,
        START_ROUND: null,
        NEXT_PLAYER: null,
        GAME_IS_LOADING: null,
        CARD_PLAYED: null,
        RESET_GAME: null
    }
);
