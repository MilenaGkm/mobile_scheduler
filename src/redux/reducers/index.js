import { combineReducers } from 'redux';
// import requestShifts from './shifts';
import loggedUser from './user'
import userRequestShift from './shifts';
import msgs from './msgs';

const rootReducer = combineReducers({
    loggedUser: loggedUser,
    userRequestShift: userRequestShift,
    msgs: msgs,
});

export default rootReducer;