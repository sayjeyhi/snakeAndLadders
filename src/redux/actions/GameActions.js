import generateDiceNumber from '../../constants/utilities/generateDiceNumber';
import * as types from '../../constants/types';

export function addNewPlayer() {
  return {
    type: types.ADD_NEW_PLAYER,
  };
}

export function movePlayer(newPos) {
  return {
    type: types.MOVE_PLAYER,
    newPos,
  };
}

export function changePlayer() {
  return { type: types.CHANGE_PLAYER };
}

export function changePlayerPositionInBox(playerId, newBoxPosition) {
  return {
    type: types.CHANGE_PLAYER_POSITION_IN_BOX,
    playerId,
    newBoxPosition,
  };
}

export function rollDice() {
  const diceResult = generateDiceNumber();
  return {
    type: types.ROLL_DICE,
    result: diceResult,
  };
}

export function logMessage(message) {
  return {
    type: types.LOG_MESSAGE,
    message,
  };
}

export function logPlayerDices(diceResult) {
  return {
    type: types.RECORD_DICE_LOG,
    diceResult,
  };
}

export function setPlayerPersistence(persistence) {
  return {
    type: types.SET_PLAYER_PERSISTENCE,
    persistence,
  };
}

export function resetDice() {
  return {
    type: types.RESET_DICE,
  };
}

export function resetPlayers() {
  return {
    type: types.RESET_PLAYERS,
  };
}

export function resetGrid() {
  return {
    type: types.RESET_GRID,
  };
}

export function resetMessages() {
  return {
    type: types.RESET_MESSAGES,
  };
}

export function enableDice() {
  return {
    type: types.ENABLE_DICE,
  };
}

export function addSnakeBite() {
  return {
    type: types.ADD_SNAKE_BITE,
  };
}

export function addLadderHike() {
  return {
    type: types.ADD_LADDER_HIKE,
  };
}

export function endGame() {
  return {
    type: types.END_GAME,
  };
}

export function restartGame() {
  return {
    type: types.RESTART_GAME,
  };
}

export function redraw(width, height) {
  return {
    type: types.REDRAW,
    width,
    height,
  };
}
