import { dispatchHelper } from '../utils/utils'

export const isFollowing = username =>
  dispatchHelper('IS_FOLLOWING', '/follows/is-following', { username })

export const getUserStats = username =>
  dispatchHelper('GET_USER_STATS', '/follows/get-user-stats', { username })

export const getFollowers = user =>
  dispatchHelper('GET_FOLLOWERS', '/follows/get-followers', { user })

export const getFollowings = user =>
  dispatchHelper('GET_FOLLOWINGS', '/follows/get-followings', { user })

export const toggleFollow = f => {
  return {
    type: 'FOLLOW_TOGGLE',
    payload: f,
  }
}

export const Follower = follower => {
  return {
    type: 'FOLLOWER',
    payload: follower,
  }
}

export const Unfollower = unfollower => {
  return {
    type: 'UNFOLLOWER',
    payload: unfollower,
  }
}

export const Following = following => {
  return {
    type: 'FOLLOWING',
    payload: following,
  }
}

export const Unfollowing = unfollowing => {
  return {
    type: 'UNFOLLOWING',
    payload: unfollowing,
  }
}

export const removeFavourites = fav_id => {
  return {
    type: 'REMOVE_FAVOURITES',
    payload: fav_id,
  }
}

export const getUsersToRecommend = user =>
  dispatchHelper('USERS_TO_RECOMMEND', '/follows/get-users-to-recommend', { user })

export const removeRecommendation = recommend_id => {
  return {
    type: 'REMOVE_RECOMMENDATION',
    payload: recommend_id,
  }
}
