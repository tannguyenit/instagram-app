import { post } from 'axios'
import Notify from 'handy-notification'
import {
  conversationAdded,
  messaged,
  changeLastMssg,
  unsendAllMessages,
  deleteCon,
  deleteMssg,
} from '../actions/message'
import { insta_notify, imageCompressor, wait } from './utils'
import d from './API/DOM'
import Action from './API/Action'
import storeProvider from '../store/storeProvider'


/**
 * Scrolls down to bottom of the conversation
 */
export const messageScroll = () => {
  new d('.mssg_end').scrollTop()
}

/**
 * Creates a new conversation
 * @param {Object} options
 * @param {Number} options.user
 * @param {String} options.username
 * @param {Function} options.dispatch
 * @param {Boolean} options.updateConversations
 * @param {Function} options.done
 */
export const newConversation = async options => {
  let { user, username, updateConversations, dispatch, done } = options
  let {
    data: { message, success, con_id },
  } = await post('/conversations/create-new-conversation', { user })

  wait()

  if (success) {
    done()

    if (updateConversations) {
      dispatch(
        conversationAdded({
          key: con_id,
          con_id,
          con_with: user,
          con_with_username: username,
          lastMssg: {
            lastMessage: '',
            lastMssgBy: null,
            lastMssgTime: null,
            lastMssgType: '',
          },
          unreadMssgs: 0,
        })
      )
    }

    insta_notify({
      to: user,
      type: 'new_con',
    })
  }

  Notify({ value: message })
}

/**
 * A helper for dispatching actions related to messages
 * @param {Object} options
 */
const messageDispatchHelper = async options => {
  let { con_id, con_with, message_id, message, messageType, dispatch } = options
  const { User: { session: { id }}} = storeProvider.getStore().getState()

  dispatch(
    messaged({
      con_id,
      message,
      message_id,
      message_time: `${new Date().getTime()}`,
      mssg_by: id,
      mssg_to: con_with,
      type: messageType,
      status: 'read',
    })
  )

  dispatch(
    changeLastMssg({
      con_id,
      lastMssg: {
        lastMessage: message,
        lastMssgBy: session,
        lastMssgTime: `${new Date().getTime()}`,
        lastMssgType: messageType,
      },
    })
  )
}

/**
 * Test message
 * @param {Object} options
 * @param {String} options.message
 * @param {Number} options.con_id
 * @param {Number} options.con_with
 * @param {Function} options.dispatch
 */
export const textMessage = async options => {
  let { message, con_id, con_with, dispatch } = options
  let action = new Action('.mssg_send')

  action.start()

  if (!message) {
    Notify({ value: 'Comment field is empty!!' })
  } else {
    let {
      data: { success, message, message_id },
    } = await post('/conversations/text-message', { message, con_id, con_with })

    if (success) {
      messageDispatchHelper({
        con_id,
        con_with,
        message_id,
        message,
        messageType: 'text',
        dispatch,
      })
    } else {
      Notify({ value: message })
    }
  }

  messageScroll()
  action.end('Send')
}

/**
 * Image message
 * @param {Object} options
 * @param {File} options.file
 * @param {Number} options.con_id
 * @param {Number} options.con_with
 * @param {Function} options.dispatch
 */
export const imageMessage = async options => {
  let { file: messageFile, con_id, con_with, dispatch } = options,
    form = new FormData(),
    file = await imageCompressor(messageFile),
    o = new d('.overlay-2')

  o.show()
  wait()

  form.append('messageFile', file)
  form.append('con_id', con_id)
  form.append('con_with', con_with)

  let {
    data: { success, message, message_id, filename },
  } = await post('/conversations/image-message', form)

  if (success) {
    messageDispatchHelper({
      con_id,
      con_with,
      message_id,
      message: filename,
      messageType: 'image',
      dispatch,
    })
  }

  messageScroll()
  o.hide()
  Notify({ value: message })
}

/**
 * Sticker message
 * @param {Object} options
 * @param {Number} options.con_id
 * @param {Number} options.con_with
 * @param {String} options.sticker
 * @param {Function} options.dispatch
 */
export const stickerMessage = async options => {
  let { con_id, con_with, sticker, dispatch } = options
  let {
    data: { success, message, filename, message_id },
  } = await post('/conversations/sticker-message', { con_id, con_with, sticker })

  wait()

  if (success) {
    messageDispatchHelper({
      con_id,
      con_with,
      message_id,
      message: filename,
      messageType: 'sticker',
      dispatch,
    })
  }

  Notify({ value: message })
  messageScroll()
}

/** Unsend all messages
 * @param {Object} options
 * @param {Number} options.con_id
 * @param {Function} options.dispatch
 */
export const deleteYourMssgs = async options => {
  let { con_id, dispatch } = options
  const { User: { session: { id }}} = storeProvider.getStore().getState()

  wait()

  let {
    data: { success, message },
  } = await post('/conversations/unsend-all-mssgs', { con_id })

  success ? dispatch(unsendAllMessages(id)) : null

  Notify({ value: message })
}

/**
 * Deletes a conversation
 * @param {Object} options
 * @param {Number} options.con_id
 * @param {Function} options.dispatch
 * @param {Function} options.hideConversation
 */
export const deleteConversation = async options => {
  let { con_id, dispatch, hideConversation } = options
  let {
    data: { success, message },
  } = await post('/conversations/delete-conversation', { con_id })

  wait()

  if (success) {
    dispatch(deleteCon(con_id))
    hideConversation()
  }

  Notify({ value: message })
}

/**
 *
 * @param {Object} options
 * @param {Number} options.message_id
 * @param {String} options.message
 * @param {String} options.type
 * @param {Function} options.dispatch
 * @param {Function} options.done
 */
export const deleteMessage = async options => {
  let { message_id, message, type, dispatch, done } = options

  let {
    data: { success, message: mess },
  } = await post('/conversations/delete-message', { message_id, message, type })

  if (success) {
    dispatch(deleteMssg(message_id))
    done()
  }

  Notify({ value: mess })
}
