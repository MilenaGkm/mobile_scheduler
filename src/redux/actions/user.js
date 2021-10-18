import * as type from '../types';

export function getLoggedUser(loggedUser) {
    return {
        type: type.GET_LOGGED_USER_REQUESTED,
        payload: loggedUser,
    }
}