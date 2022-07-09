import React, { Component } from 'react'
import PostIt from './post-it'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import avatarDefault from "../../../images/avatars/avatar-default.jpeg";
import Avatar from '../../avatar';

class PostItTeaser extends Component {
  state = {
    postIt: false,
  }

  togglePostIt = e => {
    e ? e.preventDefault() : null
    this.setState({ postIt: !this.state.postIt })
  }

  render() {
    const { postIt } = this.state
    const {
      type,
      group,
      disabled,
      auth: { username, avatar = avatarDefault },
    } = this.props

    return (
      <div>
        <div
          className="post_it inst"
          style={{ marginBottom: type === 'group' && 10 }}
        >
          <Avatar avatar={avatar} alt="Your avatar"/>
          <div className="post_teaser">
            <span
              className="p_whats_new"
              onClick={disabled ? null : this.togglePostIt}
            >
              What's new with you, @{username}? #cool
            </span>
          </div>
        </div>

        {postIt && (
          <PostIt back={this.togglePostIt} type={type} group={group} />
        )}
      </div>
    )
  }
}

PostItTeaser.defaultProps = {
  disabled: false,
}

PostItTeaser.propTypes = {
  type: PropTypes.oneOf(['user', 'group']).isRequired,
  disabled: PropTypes.bool,
  group: PropTypes.number,
}

const mapStateToProps = store => ({
  auth: store.User.session,
})

export default connect(mapStateToProps)(PostItTeaser)
export { PostItTeaser as PurePostItTeaser }
