import { post } from 'axios'
import { dispatchHelper } from '../utils/utils'

export const getConversations = () =>
  dispatchHelper('GET_CONVERSATIONS', '/conversations/get-conversations')

export const conversationAdded = conversation => {
  return {
    type: 'CONVERSATION_ADDED',
    payload: conversation,
  }
}

export const getConversationMessages = (con_id, when) =>
  dispatchHelper('GET_CONVERSATION_MESSAGES', '/conversations/get-conversation-messages', {
    con_id,
    when,
  })

export const messaged = message => {
  return {
    type: 'MESSAGE',
    payload: message,
  }
}

export const changeLastMssg = lastMssg => {
  return {
    type: 'CHANGE_LAST_MSSG',
    payload: lastMssg,
  }
}

export const deleteMssg = message_id => {
  return {
    type: 'DELETE_MESSAGE',
    payload: message_id,
  }
}

export const unsendAllMessages = mssg_by => {
  return {
    type: 'UNSEND_ALL_MSSGS',
    payload: mssg_by,
  }
}

export const deleteCon = con_id => {
  return {
    type: 'DELETE_CONVERSATION',
    payload: con_id,
  }
}

export const getConAbout = (con_id, user) =>
  dispatchHelper('GET_CONVERSATION_ABOUT', '/conversations/get-conversation-about', {
    con_id,
    user,
  })

export const getUnreadMessages = () =>
  dispatchHelper('GET_UNREAD_MESSAGES', '/conversations/get-unread-messages')

export const readConversation = (con_id, unreadMssgs) => {
  return dispatch => {
    post('/conversations/read-conversation', { con_id })
      .then(() => {
        dispatch({ type: 'READ_CONVERSATION', payload: con_id })

        unreadMssgs != 0
          ? dispatch({
              type: 'UPDATE_UNREAD_CONVERSATIONS',
              payload: unreadMssgs,
            })
          : null
      })
      .catch(e => console.log(e))
  }
}

export const getOnlineUsers = () =>
  dispatchHelper('GET_ONLINE_USERS', '/conversations/get-online-users')

export const getConDetails = con_id =>
  dispatchHelper('GET_CON_DETAILS', '/conversations/get-conversation-details', { con_id })
