import { call, put, takeEvery } from 'redux-saga/effects'
import { getLoggedUserApi } from '../../services/apiServices';


function* fetchUser(action) {
   // console.log(action.payload);
   try {
      const loggedUser = yield call(getLoggedUserApi, action.payload);
      yield put({type: 'GET_LOGGED_USER_SUCCESS', loggedUser: loggedUser});
      // yield fetchUsers();
   } catch (e) {
      yield put({type: 'GET_LOGGED_USER_FAILED', message: e.message});
   }
}

function* userSaga() {
   yield takeEvery('GET_LOGGED_USER_REQUESTED', fetchUser);
}

export default userSaga;