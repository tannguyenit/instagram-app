import { post } from 'axios'
import Notify from 'handy-notification'
import { addGroupPost, addUserPost } from '../actions/post'
import { insta_notify, Me, wait } from './utils'
import * as PostActions from '../actions/post'
import d from './API/DOM'
import Action from './API/Action'

import storeProvider from '../store/storeProvider'


/**
 * Add post
 * @param {Object} options Options for creating a new post
 * @param {Function} options.dispatch
 * @param {String} options.desc
 * @param {String} options.targetFile
 * @param {String} options.filter
 * @param {String} options.location
 * @param {String} options.type
 * @param {Number} options.group
 * @param {String} options.group_name
 * @param {Object[]} options.tags
 * @param {Number} options.tags.user
 * @param {String} options.tags.username
 */
export const addPost = async options => {
  const { User: { session: { id: user, username }}} = storeProvider.getStore().getState()

  let {
      dispatch,
      desc,
      s3Path,
      filter,
      location,
      type,
      group,
      group_name,
      tags,
    } = options
    // form = new FormData()
    // file = await imageCompressor(targetFile),

  // form.append('desc', desc)
  // form.append('image', file)
  // form.append('filter', filter)
  // form.append('location', location)
  // form.append('type', type)
  // form.append('group', group)

  const data = {desc, filter, location, type, group, s3Path }

  let {
    data: { success, message, post_id, firstname, surname, filename },
  } = await post('/posts/post-it', data)
  await post('/posts/tag-post', { tags, post_id })

  tags.forEach( t => {
     insta_notify({
      to: t.user,
      type: 'tag',
      post_id: post_id,
    })
  })

  if (success) {
    let newPost = {
      key: post_id,
      comments_count: 0,
      likes_count: 0,
      shares_count: 0,
      tags_count: tags.length,
      user,
      username,
      firstname,
      surname,
      description: desc,
      filter,
      imgSrc: filename,
      location,
      post_time: `${new Date().getTime()}`,
      post_id,
      group_id: 0,
      group_name: '',
      type: 'user',
    }

    type == 'user'
      ? dispatch(
          addUserPost({
            ...newPost,
            when: 'feed',
          })
        )
      : dispatch(
          addGroupPost({
            ...newPost,
            group_id: group,
            group_name,
            type: 'group',
            when: 'groupPosts',
          })
        )
  }

  // action.end()
  Notify({ value: message })
}

/**
 * Edit post
 *
 * @param {Object} options
 * @param {Number} options.post_id
 * @param {String} options.description
 * @param {Function} options.dispatch
 * @param {Function} options.done
 * @param {Function} options.failed
 */
export const editPost = async options => {
  let { post_id, description, dispatch, done, failed } = options
  let {
    data: { success, message },
  } = await post('/posts/edit-post', { description, post_id })

  if (success) {
    dispatch(PostActions.editPost({ post_id, description }))
    done()
  } else {
    failed()
  }

  Notify({ value: message })
}

/**
 * Deletes a post
 * @param {Object} options
 * @param {Number} options.post_id
 * @param {String} options.when
 * @param {Function} options.dispatch
 * @param {Function} options.redirect
 */
export const deletePost = async options => {
  let { post_id, when, dispatch, redirect } = options

  wait()

  let {
    data: { success, message },
  } = await post('/posts/delete-post', { post: post_id })

  if (success) {
    dispatch(PostActions.deletePost(post_id))
    when == 'viewPost' ? redirect() : null
  }

  Notify({ value: message })
}

/**
 * Like post
 * @param {Object} options
 * @param {Number} options.post_id
 * @param {Number} options.user
 * @param {Function} options.done
 */
export const like = async options => {
  let { post_id, user, done } = options
  let {
    data: { success, message },
  } = await post('/posts/like-post', { post: post_id })

  if (success) {
    !Me(user)
      ? insta_notify({
          to: user,
          type: 'like',
          post_id,
        })
      : null

    done()
  } else {
    Notify({ value: message })
  }
}

/**
 * Unlikes a post
 * @param {Object} options
 * @param {Number} options.post_id
 * @param {Function} options.done
 */
export const unlike = async options => {
  let { post_id, done } = options
  let {
    data: { success, message },
  } = await post('/posts/unlike-post', { post_id })
  success ? done() : Notify({ value: message })
}

/**
 * Bookmarks a post
 * @param {Object} options
 * @param {Number} options.post_id
 * @param {Function} options.done
 */
export const bookmark = async options => {
  let { post_id, done } = options
  let {
    data: { success, message },
  } = await post('/posts/bookmark-post', { post_id })

  success ? done() : null
  Notify({ value: message })
}

/**
 * Unbookmark post
 * @param {Object} options
 * @param {Number} options.post_id
 * @param {String} options.when
 * @param {Number} options.user
 * @param {Function} options.dispatch
 * @param {Function} options.done
 */
export const unbookmark = async options => {
  let { post_id, when, user, dispatch, done } = options
  const { User: { session: { id: authId }}} = storeProvider.getStore().getState()

  let {
    data: { success, message },
  } = await post('/posts/unbookmark-post', { post: post_id, user: authId })

  if (success) {
    if (when == 'bookmarks' && Me(user)) {
      dispatch(PostActions.unbookmark(post_id))
      Notify({ value: 'Post unbookmarked!!' })
    }
    done()
  } else {
    Notify({ value: message })
  }
}

/**
 *  Share post
 * @param {Object} options
 * @param {Number} options.user
 * @param {Number} options.post_id
 * @param {Number} options.postOwner
 * @param {Function} options.done
 */
export const share = async options => {
  let { user, post_id, postOwner, done } = options
  new d('.share_btn').blur()

  let {
    data: { message, success },
  } = await post('/posts/share-post', { share_to: user, post_id })

  if (success) {
    insta_notify({
      to: user,
      type: 'share',
      post_id,
    })
    !Me(postOwner)
      ? insta_notify({
          to: postOwner,
          type: 'shared_your_post',
          post_id,
        })
      : null

    done()
  }

  Notify({ value: message })
}

/**
 * Unshare post
 * @param {Object} options
 * @param {Number} options.user
 * @param {Number} options.post_id
 * @param {Function} options.done
 */
export const unshare = async options => {
  let { user, post_id, done } = options
  new d('.share_btn').blur()

  let {
    data: { success, message },
  } = await post('/posts/unshare-post', { unshare_to: user, post_id })

  success ? done() : null
  Notify({ value: message })
}
