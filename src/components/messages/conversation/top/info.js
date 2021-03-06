import React from 'react'
import TimeAgo from 'handy-timeago'
import { connect } from 'react-redux'
import AppLink from '../../../others/link/link'
import Avatar from "../../../avatar";

const ConversationInfo = ({ cd }) => {
  let {
    avatar,
    con_with_username,
    con_with_firstname,
    con_with_surname,
    isOnline,
    lastOnline,
  } = cd

  return (
    <div>
      <Avatar avatar={avatar} className="con_with_avatar"/>

      <div className="m_m_t_c">
        <AppLink
          url={`/profile/${con_with_username}`}
          className="con_name"
          label={con_with_username}
        />

        <span className="m_m_t_useless">
          {isOnline
            ? 'online'
            : lastOnline
              ? `Last active ${TimeAgo(lastOnline)}`
              : `${con_with_firstname} ${con_with_surname}`}
        </span>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  cd: state.Message.conDetails,
})

export default connect(mapStateToProps)(ConversationInfo)
