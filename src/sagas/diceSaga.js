import { select, takeEvery, put } from 'redux-saga/effects';
import {
  addLadderHike,
  addSnakeBite,
  changePlayer,
  enableDice,
  endGame,
  logMessage, logPlayerDices,
  movePlayer,
  ROLL_DICE,
  setPlayerPersistence
} from "../actions/GameActions";

import {
  getRandomEmoji,
  getRandomExcellentEmoji,
  getRandomSadEmoji,
} from '../constants/utilities';

import { getDice, getGame, getPlayers } from '../selectors';

/**
 * Fake delay between things
 * @param ms
 * @returns {Promise<unknown>}
 */
const delay = ms => new Promise(res => setTimeout(res, ms));

/**
 * Watch when roll dice happens
 * @returns {IterableIterator<SimpleEffect<"FORK", ForkEffectDescriptor>>}
 */
export function* watchRollDiceSaga() {
  yield takeEvery(ROLL_DICE, rollDiceProcessSaga);
}

/**
 * Handle dice roll
 * @returns {IterableIterator<SimpleEffect<"PUT", PutEffectDescriptor<{type: *, newPos: *}>>|SimpleEffect<"PUT", PutEffectDescriptor<{type: *}>>|*|*[]|SimpleEffect<"FORK", ForkEffectDescriptor>|Promise<unknown>|SimpleEffect<"PUT", PutEffectDescriptor<{persistence: *, type: *}>>|SimpleEffect<"PUT", PutEffectDescriptor<{type: *, message: *}>>|SimpleEffect<"SELECT", SelectEffectDescriptor>>}
 */
export function* rollDiceProcessSaga() {
  yield delay(100);

  const {
    current: { pos, name },
    persistence,
  } = yield select(getPlayers);
  const { result: diceResult } = yield select(getDice);
  const { ladders, snakes } = yield select(getGame);

  yield put(logPlayerDices(diceResult));
  const newPos = pos + diceResult;

  /**
   * GAME LOGIC
   **/
  if (newPos > 100) {
    yield [
      put(logMessage(` ${name} منتظر عدد مناسب ! 😨 `)),
      put(changePlayer()),
    ];
  } else if (newPos === 100) {
    yield [
      put(movePlayer(newPos)),
      put(logMessage(`هوراااا ، ${name} برنده بازی شد `))
    ];

    yield delay(800);
    yield put(endGame());
  } else {
    yield put(movePlayer(newPos));

    let emoji = getRandomEmoji(diceResult);
    yield put(logMessage(` ${name} ${diceResult} آورد ${emoji}`));


    /**
     * We check if player hit to busted snake or wings up ladder
     */
    let hitHappened = !1;
    const snakeStartPosList = snakes.map(s => s.startPos);
    const ladderStartPosList = ladders.map(l => l.startPos);

    if (snakeStartPosList.indexOf(newPos) !== -1) {
      hitHappened = 1;
      yield delay(400);

      /* busted */
      const snake = snakes.filter(s => s.startPos === newPos)[0];

      yield put(movePlayer(snake.endPos));
      yield put(addSnakeBite());
      yield put(logMessage(
        ` ${name} ${diceResult} آورد و با مار برخورد کرد ${getRandomSadEmoji()}`
      ));
    }

    if (ladderStartPosList.indexOf(newPos) !== -1) {
      hitHappened = 1;

      yield delay(400);

      /* got wings */
      const ladder = ladders.filter(l => l.startPos === newPos)[0];

      yield put(movePlayer(ladder.endPos));
      yield put(addLadderHike());
      yield put(logMessage(
        ` ${name} ${diceResult} آورد و از نردبان بالا رفت  ${getRandomExcellentEmoji()}`
      ));
    }


    /**
     * Did user got 6? maximum 3 times
     */
    if (diceResult === 6 && persistence < 3) {
      yield put(
        setPlayerPersistence(persistence + 1)
      );
    } else {
      // if hit did not happened
      if(!hitHappened) {
        yield delay(300);
        yield put(changePlayer());
        yield put(setPlayerPersistence(1));
      }else{
        yield delay(1000);
        yield put(changePlayer());
      }
    }

  }


  yield delay(350);
  yield put(enableDice());
}
