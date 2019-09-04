import {
  BOX_WIDTH,
  BOX_HEIGHT,
  GRID_WIDTH,
  GRID_HEIGHT,
} from '../selectors/variables';

import {
  getRandomColor,
  getRandomFace,
  getLayout,
  getSnakes,
  getLadders,
  getGridMeasurement,
} from '../selectors/utility';

import {
  ADD_NEW_PLAYER,
  MOVE_PLAYER,
  CHANGE_PLAYER,
  CHANGE_PLAYER_POSITION_IN_BOX,
  SET_PLAYER_PERSISTENCE,
} from '../actions/GameActions';

const firstPlayerColor = getRandomColor();
const firstPlayerFace = getRandomFace();
const initialState = {
  players: {
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
  },
};

export function player(state = initialState, action) {
  switch (action.type) {
    case ADD_NEW_PLAYER:
      const newPlayer = _generateNewPlayer(state.players.count);

      return {
        ...state,
        grid: {
          ...state.grid,
          occupancy: {
            ...state.grid.occupancy,
            1: state.grid.occupancy[1] + 1,
          },
        },
        players: {
          ...state.players,
          all: [...state.players.all, newPlayer],
          count: state.players.count + 1,
        },
      };

    case MOVE_PLAYER:
      let newOccupancy = {};
      newOccupancy[action.newPos] = state.grid.occupancy[action.newPos] + 1;
      newOccupancy[state.players.current.pos] =
        state.grid.occupancy[state.players.current.pos] - 1;

      return {
        ...state,
        grid: {
          ...state.grid,
          occupancy: {
            ...state.grid.occupancy,
            ...newOccupancy,
          },
        },
        players: {
          ...state.players,
          all: state.players.all.map(p => {
            if (p.id === state.players.current.id) {
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
            ...state.players.current,
            pos: action.newPos,
            boxPosition: -1,
            path: [...state.players.current.path, action.newPos],
          },
        },
      };

    case SET_PLAYER_PERSISTENCE:
      return {
        ...state,
        players: {
          ...state.players,
          persistence: action.persistence,
        },
      };

    case CHANGE_PLAYER:
      const nextPlayer = _getNextPlayer(state.players);
      return {
        ...state,
        dice: {
          ...state.dice,
          disabled: false,
        },
        players: {
          ...state.players,
          current: nextPlayer,
        },
      };

    case CHANGE_PLAYER_POSITION_IN_BOX:
      let curPlayer =
        state.players.current.id === action.playerId
          ? {
              ...state.players.current,
              boxPosition: action.newBoxPosition,
            }
          : state.players.current;
      return {
        ...state,
        players: {
          ...state.players,
          all: state.players.all.map(p => {
            if (p.id === action.playerId) {
              return {
                ...p,
                boxPosition: action.newBoxPosition,
              };
            }
            return p;
          }),
          current: curPlayer,
        },
      };
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

// function _initializeOccupancy() {
//   var occupacy = {};
//   occupacy[1] = 1;
//   for (let i = 2; i <= 100; i++) {
//     occupacy[i] = 0;
//   }
//   return occupacy;
// }
