import { all } from 'redux-saga/effects';
import { watchRollDiceSaga } from './diceSaga';
import { watchGameRestartSaga } from './gameSaga';

export default function* root() {
  yield all([watchRollDiceSaga(), watchGameRestartSaga()]);
}
