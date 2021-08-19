import { call, put, takeEvery } from 'redux-saga/effects'
import { getReqShifts, getUserReqShift } from '../../services/apiServices';

function* fetchReqShifts(action) {
   try {
      const requestShifts = yield call(getReqShifts);
      yield put({type: 'GET_REQ_SHIFT_SUCCESS', requestShifts: requestShifts});
   } catch (e) {
      yield put({type: 'GET_REQ_SHIFT_FAILED', message: e.message});
   }
}

function* fetchUserReqShift(action) {
   try {
      const userRequestShift = yield call(getUserReqShift, action.payload);
      yield put({type: 'GET_USER_REQ_SHIFT_SUCCESS', userRequestShift: userRequestShift});
   } catch (e) {
      yield put({type: 'GET_USER_REQ_SHIFT_FAILED', message: e.message});
   }
}

function* requestShiftsSaga() {
   yield takeEvery('GET_REQ_SHIFT_REQUESTED', fetchReqShifts);
   yield takeEvery('GET_USER_REQ_SHIFT_REQUESTED', fetchUserReqShift);
}

export default requestShiftsSaga;
