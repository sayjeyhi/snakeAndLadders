import { getRandomColor, getRandomFace } from '../../constants/utilities';

import {
  ADD_NEW_PLAYER,
  MOVE_PLAYER,
  CHANGE_PLAYER,
  CHANGE_PLAYER_POSITION_IN_BOX,
  SET_PLAYER_PERSISTENCE,
  ADD_SNAKE_BITE,
  RECORD_DICE_LOG,
  ADD_LADDER_HIKE,
  RESET_PLAYERS,
} from '../../constants/types';

const firstPlayerColor = getRandomColor();
const firstPlayerFace = getRandomFace();
const initialState = {
  count: 1,
  persistence: 1,
  current: {
    id: 1,
    pos: 1,
    color: firstPlayerColor,
    path: [1],
    diceLog: [],
    boxPosition: -1, //center
    snakeBites: 0,
    ladderHikes: 0,
    ...firstPlayerFace,
  },
  all: [
    {
      id: 1,
      pos: 1,
      color: firstPlayerColor,
      path: [1],
      diceLog: [],
      boxPosition: -1, //center
      snakeBites: 0,
      ladderHikes: 0,
      ...firstPlayerFace,
    },
  ],
};

export function players(state = initialState, action) {
  switch (action.type) {
    case ADD_NEW_PLAYER:
      const newPlayer = _generateNewPlayer(state.count);

      return {
        ...state,
        all: [...state.all, newPlayer],
        count: state.count + 1,
      };

    case MOVE_PLAYER:
      return {
        ...state,
        all: state.all.map(p => {
          if (p.id === state.current.id) {
            return {
              ...p,
              pos: action.newPos,
              boxPosition: -1,
              path: [...p.path, action.newPos],
            };
          }
          return p;
        }),
        current: {
          ...state.current,
          pos: action.newPos,
          boxPosition: -1,
          path: [...state.current.path, action.newPos],
        },
      };

    case SET_PLAYER_PERSISTENCE:
      return {
        ...state,
        persistence: action.persistence,
      };

    case RECORD_DICE_LOG:
      return {
        ...state,
        all: state.all.map(p => {
          if (p.id === state.current.id) {
            return {
              ...p,
              diceLog: [...p.diceLog, action.diceResult],
            };
          }
          return p;
        }),
        current: {
          ...state.current,
          diceLog: [...state.current.diceLog, action.diceResult],
        },
      };

    case CHANGE_PLAYER:
      const nextPlayer = _getNextPlayer(state);
      return {
        ...state,
        current: nextPlayer,
      };

    case CHANGE_PLAYER_POSITION_IN_BOX:
      let curPlayer =
        state.current.id === action.playerId
          ? {
              ...state.current,
              boxPosition: action.newBoxPosition,
            }
          : state.current;
      return {
        ...state,
        all: state.all.map(p => {
          if (p.id === action.playerId) {
            return {
              ...p,
              boxPosition: action.newBoxPosition,
            };
          }
          return p;
        }),
        current: curPlayer,
      };

    case ADD_SNAKE_BITE:
      const newSnakeBites = state.current.snakeBites + 1;
      return {
        ...state,
        all: state.all.map(p => {
          if (p.id === state.current.id) {
            return {
              ...p,
              snakeBites: newSnakeBites,
            };
          }
          return p;
        }),
        current: {
          ...state.current,
          snakeBites: newSnakeBites,
        },
      };

    case ADD_LADDER_HIKE:
      const newLadderHikes = state.current.ladderHikes + 1;
      return {
        ...state,
        all: state.all.map(p => {
          if (p.id === state.current.id) {
            return {
              ...p,
              ladderHikes: newLadderHikes,
            };
          }
          return p;
        }),
        current: {
          ...state.current,
          ladderHikes: newLadderHikes,
        },
      };

    case RESET_PLAYERS:
      return {
        ...initialState,
      };
    default:
      return state;
  }
}

/*
 * Private functions
 */

function _generateNewPlayer(curCount) {
  return {
    id: curCount + 1,
    color: getRandomColor(),
    pos: 1,
    path: [1],
    diceLog: [],
    boxPosition: -1, //center
    snakeBites: 0,
    ladderHikes: 0,
    ...getRandomFace(),
  };
}

function _getNextPlayer({ all, current, count }) {
  return current.id === count
    ? all[0]
    : all.filter(p => p.id === current.id + 1)[0];
}
