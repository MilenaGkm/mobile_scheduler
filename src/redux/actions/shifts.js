import * as type from '../types';

export function getReqShifts(requestShifts) {
    return {
        type: type.GET_REQ_SHIFT_REQUESTED,
        payload: requestShifts,
    }
}

export function getUserReqShift(userRequestShift) {
    return {
        type: type.GET_USER_REQ_SHIFT_REQUESTED,
        payload: userRequestShift,
    }
}
