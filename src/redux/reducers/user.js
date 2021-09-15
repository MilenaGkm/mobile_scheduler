import * as type from '../types';

const initialState = {
    loggedUser: {},
    loading: false,
    error: null,
}

export default function user(state = initialState, action) {
    switch (action.type) {
        case type.GET_LOGGED_USER_REQUESTED:
            return {
                ...state,
                loading: true,
            }
        case type.GET_LOGGED_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                loggedUser: action.loggedUser
            }
        case type.GET_LOGGED_USER_FAILED:
            return {
                ...state,
                loading: false,
                error: action.message,
            }
        default:
            return state
    }
}
