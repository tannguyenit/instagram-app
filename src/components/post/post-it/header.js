import React from 'react'
import { connect } from 'react-redux'
import avatarDefault from '../../../images/avatars/avatar-default.jpeg'
import Avatar from '../../avatar'

const PostItHeader = ({ postIt, session }) => {
  const { username, avatar = avatarDefault } = session
  const { location, fetchingLocation, fileChanged } = postIt
  const fetchingCondition = fetchingLocation && fileChanged

  return (
    <div className="i_p_top p_top">
      <div className="i_p_info p_info">
        <Avatar avatar={avatar} alt='User Avatar'/>
        <span>{username}</span>
      </div>
      <span className="loc_text" title={location}>
        {fetchingCondition
          ? 'Fetching location...'
          : location
            ? `${location.substr(0, 20)}..`
            : ''}
      </span>
    </div>
  )
}

const mapStateToProps = state => ({
  session: state.User.session,
  postIt: state.Post.postIt,
})

export default connect(mapStateToProps)(PostItHeader)
