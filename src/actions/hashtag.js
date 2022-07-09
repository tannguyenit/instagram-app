import { dispatchHelper } from '../utils/utils'

export const getUserHashtags = username =>
  dispatchHelper('GET_USER_HASHTAGS', '/users/get-users-hashtags', { username })

export const getGroupHashtags = group_id =>
  dispatchHelper('GET_GROUP_HASHTAGS', '/users/get-group-hashtags', { group_id })

export const getPopularHashtags = () =>
  dispatchHelper('GET_POPULAR_HASHTAGS', '/users/get-popular-hashtags')

export const getHashtagPosts = hashtag =>
  dispatchHelper('GET_HASHTAG_POSTS', '/users/get-hashtag-posts', { hashtag })
