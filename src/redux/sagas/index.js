import { all } from 'redux-saga/effects'
import requestShiftsSaga from './requestShiftsSaga'

export default function* rootSaga() {
  yield all([
    requestShiftsSaga(),
  ])
}