import { all } from 'redux-saga/effects';
import { watchRollDiceSaga } from './diceSaga';
import { watchGameRestartSaga } from "./gameSaga";

function* helloSaga() {
  console.log('Hello Sagas!');
}

export default function* root() {
  yield all([
    helloSaga(),
    watchRollDiceSaga(),
    watchGameRestartSaga()
  ]);
}
