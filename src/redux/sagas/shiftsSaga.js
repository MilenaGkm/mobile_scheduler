import { call, put, takeEvery } from 'redux-saga/effects'
import { getReqShifts, getUserReqShift, postSubShiftsApi } from '../../services/apiServices';

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

function* addSubmitShift(action) {
   try {
      yield call(postSubShiftsApi, action.payload);
      // yield addRequestShift();
   } catch (e) {
      yield put({type: 'ADD_SUB_SHIFT_FAILED', message: e.message});
   }
}

function* shiftsSaga() {
   yield takeEvery('GET_REQ_SHIFT_REQUESTED', fetchReqShifts);
   yield takeEvery('GET_USER_REQ_SHIFT_REQUESTED', fetchUserReqShift);
   yield takeEvery('ADD_SUB_SHIFT_REQUESTED', addSubmitShift);
}

export default shiftsSaga;
