import { combineReducers } from 'redux';
import requestShifts from './requestShifts';
import userRequestShift from './requestShifts';

const rootReducer = combineReducers({
    requestShifts: requestShifts,
    userRequestShift: userRequestShift,
});

export default rootReducer;