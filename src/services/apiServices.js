
const reqShiftsApi = process.env.NODE_ENV == "production" ? `https://shift-publisher-nest.herokuapp.com/requested-Shifts` : 'http://localhost:3000/requested-Shifts';
const usersApi = process.env.NODE_ENV == "production" ? `https://shift-publisher-nest.herokuapp.com/users` : 'http://localhost:3000/users';
// const msgsApi = process.env.NODE_ENV == "production" ? `https://shift-publisher-nest.herokuapp.com/msgs` : 'http://localhost:3000/msgs';

export function getReqShifts() {
    return fetch(reqShiftsApi, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',

        }
    }).then(response => response.json())
        .catch((error) => { throw error })
}

export function getUserReqShift(userId) {
    return fetch(`${reqShiftsApi}/${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',

        }
    }).then(response => response.json())
        .catch((error) => { throw error })
}

// export function postReqShiftsApi(ReqShiftToAdd) {
//     const requestOptions = {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(ReqShiftToAdd)
//     };
//     return fetch(reqShiftsApi, requestOptions).catch((error) => { throw error })
// }
