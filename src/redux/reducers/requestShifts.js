import * as type from '../types';

const initialState = {
    requestShifts: [],
    userRequestShift: {},
    loading: false,
    error: null,
}

export default function requestShifts(state = initialState, action) {
    switch (action.type) {
        case type.GET_REQ_SHIFT_REQUESTED:
            return {
                ...state,
                loading: true,
            }
        case type.GET_REQ_SHIFT_SUCCESS:
            return {
                ...state,
                loading: false,
                requestShifts: action.requestShifts
            }
        case type.GET_REQ_SHIFT_FAILED:
            return {
                ...state,
                loading: false,
                error: action.message,
            }
        case type.GET_USER_REQ_SHIFT_REQUESTED:
            return {
                ...state,
                loading: true,
            }
        case type.GET_USER_REQ_SHIFT_SUCCESS:
            return {
                ...state,
                loading: false,
                userRequestShift: action.userRequestShift
            }
        case type.GET_USER_REQ_SHIFT_FAILED:
            return {
                ...state,
                loading: false,
                error: action.message,
            }
        default:
            return state
    }
}
