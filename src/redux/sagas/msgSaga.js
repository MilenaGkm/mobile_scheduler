import { call, put, takeEvery } from 'redux-saga/effects'
import { getMsgsApi, deleteMsgApi } from '../../services/apiServices';

function* fetchMsgs(action) {
   try {
      const msgs = yield call(getMsgsApi, action.payload);
      yield put({type: 'GET_MSGS_SUCCESS', msgs: msgs});
   } catch (e) {
      yield put({type: 'GET_MSGS_FAILED', message: e.message});
   }
}

function* deleteMsg(action) {
   try {
      yield call(deleteMsgApi, action.payload);
      // yield fetchMsgs();
   } catch (e) {
      yield put({type: 'DELETE_MSG_FAILED', message: e.message});
   }
}

function* msgSaga() {
   yield takeEvery('GET_MSGS_REQUESTED', fetchMsgs);
   yield takeEvery('DELETE_MSG_REQUESTED', deleteMsg);
}

export default msgSaga;