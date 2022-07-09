import { dispatchHelper } from '../utils/utils'

export const getUserDetails = username =>
  dispatchHelper('GET_USER_DETAILS', '/users/get-user-details', { username })

export const deleteTag = tag => {
  return {
    type: 'DELETE_TAG',
    payload: tag,
  }
}

export const addTag = tag => {
  return {
    type: 'ADD_TAG',
    payload: tag,
  }
}

export const setSessionUser = payload => {
  return {
    type: 'SET_SESSION_USER',
    payload,
  }
}

export const loginError = payload => {
  return {
    type: 'LOGIN_ERROR',
    payload,
  }
}

export const getAuth = () => dispatchHelper('GET_AUTH', 'users/me')

export const getMutualUsers = username =>
  dispatchHelper('GET_MUTUAL_USERS', 'users/get-mutual-users', { username })

export const checkUserName = username =>
  dispatchHelper('CHECK_USER_NAME', 'users/username-checker', { value: username })

export const registerUser = data =>
  dispatchHelper('REGISTER_USER', 'users/signup', { ...data })
