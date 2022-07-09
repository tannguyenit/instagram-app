import { post } from 'axios'
import Notify from 'handy-notification'
import { unblockUser } from '../actions/settings'
import { ObjectMssg, wait } from './utils'
import Action from './API/Action'

/**
 * Block user
 * @param {Number} user User to block
 */
export const block = async user => {
  let {
    data: { message },
  } = await post('/users/block', { user })
  Notify({ value: message })
}

/**
 *
 * @param {Object} options
 * @param {Number} options.block_id
 * @param {String} options.username
 * @param {Function} options.dispatch
 */
export const unblock = async options => {
  let { block_id, username, dispatch } = options
  let {
    data: { success, message },
  } = await post('/users/unblock-user', { block_id })

  if (success) {
    dispatch(unblockUser(block_id))
    Notify({ value: `Unblocked ${username}!!` })
  } else {
    Notify({ value: message })
  }
}

/**
 * Changes the password of session user
 * @param {String} old Old/Current password
 * @param {String} new_ New password
 * @param {String} new_a New password again for surety
 */
export const changePassword = async (old, new_, new_a) => {
  let action = new Action('.c_p_btn')

  if (!old || !new_ || !new_a) {
    Notify({ value: 'Some values are missing!!' })
  } else if (new_ != new_a) {
    Notify({ value: "New passwords don't match" })
  } else {
    action.start('Changing password..')
    wait()

    let {
      data: { message, success },
    } = await post('/users/change-password', { old, new_, new_a })

    if (success) {
      Notify({
        value: message,
        done: () => location.reload(),
      })
    } else {
      Notify({
        value: ObjectMssg(message),
      })

      action.end('Change password')
    }
  }
}

/**
 * Change user's password
 * @param {String} password User's password
 */
export const deactivateAccount = async (password, hidePrompt) => {
  let action = new Action('.prompt-done')

  action.start('Deactivating..')
  wait()

  let {
    data: { message, success },
  } = await post('/users/deactivate-account', { password })

  action.end('Deactivate')

  Notify({
    value: message,
    done: () => {
      success ? (location.href = '/login') : hidePrompt()
    },
  })
}
