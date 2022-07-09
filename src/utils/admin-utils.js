import qs from 'query-string'
import { post } from 'axios'
import Notify from 'handy-notification'
import Action from './API/Action'
import storeProvider from '../store/storeProvider'

/**
 * For submit to check if user is the admin
 * @param {Object} options
 * @param {String} options.password
 * @param {String} options.search
 */
export const adminSubmit = async options => {
  let { password, search } = options,
    toURL = qs.parse(search),
    action = new Action('.al_submit')

  if (!password) {
    Notify({ value: 'Password field is missing!!' })
  } else {
    action.start('Please wait..')

    let {
      data: { message, success },
    } = await post('/users/check-is-admin', { password })
    let to = toURL.to ? toURL.to : '/is-admin'

    Notify({
      value: message,
      done: () => (success ? (location.href = to) : null),
    })

    action.end('Continue as admin')
  }
}

/**
 * Returns if user is admin of the app
 */
export const isAdmin = () => {
  const { User: { session: { is_admin }}} = storeProvider.getStore().getState()

  return Boolean(is_admin)
}
