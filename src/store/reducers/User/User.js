/* eslint indent:0 */
/* eslint no-unreachable:0 */

import InitialState from './intialState'
import * as methods from './methods'

export default (state = InitialState, action) => {
  let py = action.payload

  switch (action.type) {
    case 'GET_USER_DETAILS':
      return {
        ...state,
        user_details: py.details,
        tags: py.tags,
      }
    case 'ADD_TAG':
      return { ...state, tags: methods.addTag(state.tags, py) }
    case 'DELETE_TAG':
      return { ...state, tags: methods.deleteTag(state.tags, py) }
    case 'GET_MUTUAL_USERS':
      return { ...state, mutualUsers: py }
    case 'CHECK_USER_NAME':
      return { ...state, username_exist: Boolean(py)}
    case 'REGISTER_USER':
      return { ...state, register_status: Boolean(py.status)}
    case 'SET_SESSION_USER':
      return { ...state, session: py }
  }

  return state
}
