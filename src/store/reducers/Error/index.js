/* eslint indent:0 */
/* eslint no-unreachable:0 */

import InitialState from './intialState'

export default (state = InitialState, action) => {
    let py = action.payload

    switch (action.type) {
        case 'SET_ERROR_MESSAGE':
            return {
                ...state,
                message: py.message,
            }
        case 'LOGIN_ERROR':
            return {
                ...state,
                message: py,
            }
        case 'REGISTER_USER':
            if (py.message) {
                return {
                    ...state,
                    message: py.message,
                }
            }
    }

    return state
}
