import { all } from 'redux-saga/effects'
import shiftsSaga from './shiftsSaga'

export default function* rootSaga() {
  yield all([
    shiftsSaga(),
  ])
}