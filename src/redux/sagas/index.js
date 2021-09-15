import { all } from 'redux-saga/effects'
import userSaga from './userSaga'
import shiftsSaga from './shiftsSaga'

export default function* rootSaga() {
  yield all([
    userSaga(),
    shiftsSaga(),
  ])
}