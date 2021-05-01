import { takeEvery, put } from 'redux-saga/effects';
import {
  resetDice,
  resetGrid,
  resetMessages,
  resetPlayers,
} from '../actions/GameActions';
import { RESTART_GAME } from '../../constants/types';

/**
 * Watch when to restart game
 * @returns {IterableIterator<SimpleEffect<"FORK", ForkEffectDescriptor>>}
 */
export function* watchGameRestartSaga() {
  yield takeEvery(RESTART_GAME, doRestartGameSaga);
}

/**
 * Handle restart
 * @returns {IterableIterator<SimpleEffect<"PUT", PutEffectDescriptor<{type: *, newPos: *}>>|SimpleEffect<"PUT", PutEffectDescriptor<{type: *}>>|*|*[]|SimpleEffect<"FORK", ForkEffectDescriptor>|Promise<unknown>|SimpleEffect<"PUT", PutEffectDescriptor<{persistence: *, type: *}>>|SimpleEffect<"PUT", PutEffectDescriptor<{type: *, message: *}>>|SimpleEffect<"SELECT", SelectEffectDescriptor>>}
 */
export function* doRestartGameSaga() {
  yield put(resetPlayers());
  yield put(resetDice());
  yield put(resetGrid());
  yield put(resetMessages());
}
