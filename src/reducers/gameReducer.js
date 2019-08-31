import {
  BOX_WIDTH,
  BOX_HEIGHT,
  GRID_WIDTH,
  GRID_HEIGHT,
  GAME_OVER,
  GAME_ON
} from '../config/variables';
import {
  getRandomColor,
  getLayout,
  getSnakes,
  getLadders
} from '../config/utils';
import {
  ADD_NEW_PLAYER,
  MOVE_PLAYER,
  CHANGE_PLAYER,
  CHANGE_PLAYER_POSITION_IN_BOX,
  RECORD_DICE_LOG,
  LOG_MESSAGE,
  SET_PLAYER_PERSISTENCE,
  ENABLE_DICE,
  END_GAME,
  ADD_SNAKE_BITE,
  ADD_LADDER_HIKE,
  RESTART_GAME,
  REDRAW
} from '../actions/GameActions';

const firstPlayerColor = getRandomColor();
const initialState = {
  status: GAME_ON,
  dice: {
    disabled: false
  },
  messages: [
    'Start rolling'
  ],
  grid: {
    layout: getLayout(GRID_WIDTH, GRID_HEIGHT),
    width: GRID_WIDTH,
    height: GRID_HEIGHT,
    occupancy: _initializeOccupancy(),
    box: {
      height: BOX_HEIGHT,
      width: BOX_WIDTH
    }
  },
  snakes: getSnakes(),
  ladders: getLadders(),
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
      ladderHikes:0
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
        ladderHikes:0
      }
    ]
  }
}

export function game (state = initialState, action) {

  switch (action.type) {
    case ADD_NEW_PLAYER:
      const newPlayer = _generateNewPlayer(state.players.count);

      return {
          ...state,
          grid: {
            ...state.grid,
            occupancy: {
              ...state.grid.occupancy,
              1: state.grid.occupancy[1] + 1
            }
          },
          players: {
            ...state.players,
            all: [ ...state.players.all ,newPlayer],
            count: state.players.count + 1,
          }
      };

    case MOVE_PLAYER:
      let newOccupancy = {};
      newOccupancy[action.newPos] = state.grid.occupancy[action.newPos] + 1;
      newOccupancy[state.players.current.pos] = state.grid.occupancy[state.players.current.pos] - 1;

      return {
        ...state,
        dice: {
          ...state.dice,
          disabled: true
        },
        grid: {
          ...state.grid,
          occupancy: {
            ...state.grid.occupancy,
            ...newOccupancy
          }
        },
        players: {
          ...state.players,
          all: state.players.all.map((p) => {
            if (p.id === state.players.current.id) {
              return {
                ...p,
                pos: action.newPos,
                boxPosition: -1,
                path: [...p.path, action.newPos]
              }
            }
            return p;
          }),
          current: {
            ...state.players.current,
            pos: action.newPos,
            boxPosition: -1,
            path: [...state.players.current.path, action.newPos]
          }
        }
      };

    case CHANGE_PLAYER:
      var nextPlayer = _getNextPlayer(state.players)
      return {
        ...state,
        dice: {
          disabled: false
        },
        players: {
          ...state.players,
          current: nextPlayer
        }
      };

    case RECORD_DICE_LOG:
      return {
        ...state,
        players: {
          ...state.players,
          all: state.players.all.map((p) => {
            if (p.id === state.players.current.id) {
              return {
                ...p,
                diceLog: [...p.diceLog, action.diceResult]
              }
            }
            return p;
          }),
          current: {
            ...state.players.current,
            diceLog: [...state.players.current.diceLog, action.diceResult]
          }
        }
      };

    case CHANGE_PLAYER_POSITION_IN_BOX:
      let curPlayer = state.players.current.id === action.playerId
                      ?
                      { ...state.players.current, boxPosition: action.newBoxPosition }
                      : state.players.current
      return {
        ...state,
        players: {
          ...state.players,
          all: state.players.all.map((p) => {
            if (p.id === action.playerId) {
              return {
                ...p,
                boxPosition: action.newBoxPosition
              }
            }
            return p;
          }),
          current: curPlayer
        }
      };

    case LOG_MESSAGE:
      return {
        ...state,
        messages: [action.message, ...state.messages]
      };

    case SET_PLAYER_PERSISTENCE:
      return {
        ...state,
        players: {
          ...state.players,
          persistence: action.persistence
        }
      };

    case ENABLE_DICE:
      return {
        ...state,
        dice: {
          ...state.dice,
          disabled: false
        }
      };

    case END_GAME:
      return {
        ...state,
        status: GAME_OVER
      };

    case ADD_SNAKE_BITE:
      const newSnakeBites = state.players.current.snakeBites + 1;
      return {
        ...state,
        players: {
          ...state.players,
          all: state.players.all.map((p) => {
            if (p.id === state.players.current.id) {
              return {
                ...p,
                snakeBites: newSnakeBites
              }
            }
            return p;
          }),
          current: {
            ...state.players.current,
            snakeBites: newSnakeBites
          }
        }
      }

    case ADD_LADDER_HIKE:
      const newLadderHikes = state.players.current.ladderHikes + 1;
      return {
        ...state,
        players: {
          ...state.players,
          all: state.players.all.map((p) => {
            if (p.id === state.players.current.id) {
              return {
                ...p,
                ladderHikes: newLadderHikes
              }
            }
            return p;
          }),
          current: {
            ...state.players.current,
            ladderHikes: newLadderHikes
          }
        }
      };

    case RESTART_GAME:
      return initialState;

    case REDRAW:
      let newGrid = {};
      let newWidth = action.width - 32;
      let newHeight = action.height - 32;
      newWidth = newWidth > 672 ? newWidth / 2 : newWidth;
      newGrid = {
        layout: getLayout(newWidth, newWidth),
        width: newWidth,
        height: newWidth,
        box: {
          height: newWidth / 10,
          width: newWidth / 10
        }
      }
      return {
        ...state,
        grid: {
          ...state.grid,
          ...newGrid
        }
      }

    default:
      return state;
  }
}

/*
 * Private functions
 */

function _generateNewPlayer (curCount) {
  return {
    id: curCount + 1,
    color: getRandomColor(),
    pos: 1,
    path: [1],
    diceLog: [],
    boxPosition: -1, //center
    snakeBites: 0,
    ladderHikes: 0,
  }
}

function _getNextPlayer ({all, current, count}) {
  return current.id === count ? all[0] : all.filter((p) => p.id === current.id + 1 )[0];
}

function _initializeOccupancy () {
  var occupacy = {};
  occupacy[1] = 1;
  for (let i=2; i<=100; i++) {
    occupacy[i] = 0;
  }
  return occupacy;
}
