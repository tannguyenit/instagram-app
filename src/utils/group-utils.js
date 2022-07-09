import { post } from 'axios'
import Notify from 'handy-notification'
import { insta_notify, ObjectMssg, wait } from './utils'
import { leftGroup, updateGroup } from '../actions/group'
import Action from './API/Action'

/**
 * Creates a group
 * @param {Object} options
 * @param {String} options.name
 * @param {String} options.bio
 */
export const createGroup = async options => {
  let { name, bio, created } = options
  let action = new Action('.c_g_update')

  action.start('Please wait..')
  wait()

  let {
    data: { message, success, groupId },
  } = await post('/groups/create-group', { name, bio })

  if (success) {
    Notify({ value: message })
    created(groupId)
  } else {
    Notify({
      value: ObjectMssg(message),
    })
  }

  action.end('Create group')
}

/**
 * Edit group
 * @param {Number} options.group_id
 * @param {Object} options
 * @param {String} options.name
 * @param {String} options.bio
 * @param {Boolean} options.isPrivate
 * @param {Function} options.dispatch
 */
export const editGroup = async options => {
  let { group_id, name, bio, isPrivate, dispatch } = options,
    group_type = isPrivate ? 'private' : 'public',
    action = new Action('.g_e_save_btn', true, 'sec_btn_disabled')

  action.start('Updating..')
  wait()

  let {
    data: { success, message },
  } = await post('/groups/edit-group', { name, bio, group_type, group: group_id })

  success ? dispatch(updateGroup({ name, bio, group_type })) : null

  Notify({ value: message })
  action.end('Update')
}

/**
 * Join group
 *
 * user, group, when & done properties must be provided
 * @param {Object} options Options for joining group
 * @param {Number} options.user
 * @param {Number} options.added_by
 * @param {Number} options.group
 * @param {String} options.when
 * @param {Function} options.done
 */
export const joinGroup = async options => {
  let defaults = {
      user: null,
      added_by: null,
      group: null,
      when: '',
      done: () => null,
    },
    obj = { ...defaults, ...options },
    { user, added_by, group, when, done } = obj,
    {
      data: { message, success },
    } = await post('/groups/join-group', { user, added_by, group, when })

  if (success) {
    if (when == 'add_grp_member') {
      insta_notify({
        to: user,
        type: 'add_grp_member',
        group_id: group,
      })
    }

    done()
  }

  Notify({ value: message })
}

/**
 * Leave group
 *
 * user, group & done properties must be provided
 * @param {Object} options Options for leaving group
 * @param {Number} options.user
 * @param {Number} options.group
 * @param {Boolean} options.updateGroups
 * @param {Function} options.dispatch
 * @param {Function} options.done
 */
export const leaveGroup = async options => {
  let defaults = {
      user: null,
      group: null,
      updateGroups: false,
      dispatch: () => null,
      done: () => null,
    },
    obj = { ...defaults, ...options },
    { user, group, updateGroups, dispatch, done } = obj,
    {
      data: { success, message },
    } = await post('/groups/leave-group', { user, group })

  if (success) {
    updateGroups ? dispatch(leftGroup(group)) : null
    done()
  }

  Notify({ value: message })
}

/**
 * Change admin of the group
 * @param {Object} options
 * @param {Number} options.member
 * @param {Number} options.group
 */
export const changeAdmin = async options => {
  let { member, group } = options
  let {
    data: { success, message },
  } = await post('/groups/change-admin', { user: member, group })

  if (success) {
    insta_notify({
      to: member,
      type: 'change_admin',
      group_id: group,
    })
  }

  Notify({
    value: message,
    done: () => (success ? location.reload() : null),
  })
}
