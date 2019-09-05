import generateDiceNumber from '../constants/utilities/generateDiceNumber';

export const ADD_NEW_PLAYER = 'ADD_NEW_PLAYER';
export const MOVE_PLAYER = 'MOVE_PLAYER';
export const CHANGE_PLAYER = 'CHANGE_PLAYER';
export const CHANGE_PLAYER_POSITION_IN_BOX = 'CHANGE_PLAYER_POSITION_IN_BOX';
export const LOG_MESSAGE = 'LOG_MESSAGE';
export const RECORD_DICE_LOG = 'RECORD_DICE_LOG';
export const SET_PLAYER_PERSISTENCE = 'SET_PLAYER_PERSISTENCE';
export const ROLL_DICE = 'ROLL_DICE';
export const ENABLE_DICE = 'ENABLE_DICE';
export const END_GAME = 'END_GAME';
export const RESET_PLAYERS = 'RESET_PLAYERS';
export const RESET_DICE = 'RESET_DICE';
export const RESET_GRID = 'RESET_GRID';
export const RESET_MESSAGES = 'RESET_MESSAGES';
export const ADD_SNAKE_BITE = 'ADD_SNAKE_BITE';
export const ADD_LADDER_HIKE = 'ADD_LADDER_HIKE';
export const SHAKE_PLAYERS = 'SHAKE_PLAYERS';
export const RESTART_GAME = 'RESTART_GAME';
export const REDRAW = 'REDRAW';

export function addNewPlayer() {
  return {
    type: ADD_NEW_PLAYER,
  };
}

export function movePlayer(newPos) {
  return {
    type: MOVE_PLAYER,
    newPos,
  };
}

export function changePlayer() {
  return { type: CHANGE_PLAYER };
}

export function changePlayerPositionInBox(playerId, newBoxPosition) {
  return {
    type: CHANGE_PLAYER_POSITION_IN_BOX,
    playerId,
    newBoxPosition,
  };
}

export function rollDice() {
  const diceResult = generateDiceNumber();
  return {
    type: ROLL_DICE,
    result: diceResult,
  };
}

export function logMessage(message) {
  return {
    type: LOG_MESSAGE,
    message,
  };
}

export function logPlayerDices(diceResult) {
  return {
    type: RECORD_DICE_LOG,
    diceResult
  };
}

export function setPlayerPersistence(persistence) {
  return {
    type: SET_PLAYER_PERSISTENCE,
    persistence,
  };
}

export function resetDice() {
  return {
    type: RESET_DICE,
  };
}

export function resetPlayers() {
  return {
    type: RESET_PLAYERS,
  };
}

export function resetGrid() {
  return {
    type: RESET_GRID,
  };
}

export function resetMessages() {
  return {
    type: RESET_MESSAGES,
  };
}

export function enableDice() {
  return {
    type: ENABLE_DICE,
  };
}

export function addSnakeBite() {
  return {
    type: ADD_SNAKE_BITE,
  };
}

export function addLadderHike() {
  return {
    type: ADD_LADDER_HIKE,
  };
}


export function endGame() {
  return {
    type: END_GAME,
  };
}

export function restartGame() {
  return {
    type: RESTART_GAME,
  };
}

export function redraw(width, height) {
  return {
    type: REDRAW,
    width,
    height,
  };
}
