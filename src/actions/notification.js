import { dispatchHelper } from '../utils/utils'

export const getNotifications = () =>
  dispatchHelper('GET_NOTIFICATIONS', '/notifications/get-notifications')

export const clearNotifications = () =>
  dispatchHelper('CLEAR_NOTIFICATIONS', '/notifications/clear-notifications')

export const getUnreadNotifications = () =>
  dispatchHelper('GET_UNREAD_NOTIFICATIONS', '/notifications/get-unread-notifications')

export const readNotifications = () =>
  dispatchHelper('READ_NOTIFICATIONS', '/notifications/read-notifications')
