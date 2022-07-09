import React, { Fragment } from 'react'
import ViewAvatar from '../viewAvatar'
import { bool, func, oneOf } from 'prop-types'
import { connect } from 'react-redux'

const ViewAvatarAction = ({ view, back, when, user_image_url, group_image_url }) => {
  let src = when === 'user' ? user_image_url : group_image_url

  return (
    <Fragment>{view ? <ViewAvatar imgSrc={src} back={back} /> : null}</Fragment>
  )
}

ViewAvatarAction.propTypes = {
  view: bool.isRequired,
  back: func.isRequired,
  when: oneOf(['user', 'group']).isRequired,
}

const mapStateToProps = state => ({
  user_image_url: state.User.user_details.avatar,
  group_image_url: state.Group.group_details.image_url,
})

export default connect(mapStateToProps)(ViewAvatarAction)
