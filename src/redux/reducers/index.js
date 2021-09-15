import { combineReducers } from 'redux';
// import requestShifts from './shifts';
import loggedUser from './user'
import userRequestShift from './shifts';

const rootReducer = combineReducers({
    loggedUser: loggedUser,
    userRequestShift: userRequestShift,
});

export default rootReducer;