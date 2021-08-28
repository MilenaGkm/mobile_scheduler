import { combineReducers } from 'redux';
// import requestShifts from './shifts';
import userRequestShift from './shifts';

const rootReducer = combineReducers({
    // requestShifts: requestShifts,
    userRequestShift: userRequestShift,
});

export default rootReducer;