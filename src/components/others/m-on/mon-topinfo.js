import React from 'react'
import PropTypes from 'prop-types'
import { humanReadable } from '../../../utils/utils'
import AppLink from '../link/link'
import Avatar from "../../avatar";

const MonTopInfo = ({ info, basedOnMutuals }) => {
  let { username, firstname, surname, mutuals, avatar } = info

  return (
    <div className="m_top">
      <Avatar avatar={avatar}/>
      <div className="m_top_right">
        <AppLink url={`/profile/${username}`} label={username} />
        {basedOnMutuals ? (
          <span>
            {mutuals === 0
              ? `${firstname} ${surname}`
              : humanReadable(mutuals, 'mutual follower')}
          </span>
        ) : (
          <span>
            {firstname} {surname}
          </span>
        )}
      </div>
    </div>
  )
}

MonTopInfo.defaultProps = {
  basedOnMutuals: false,
  mutuals: 0,
}

MonTopInfo.propTypes = {
  info: PropTypes.shape({
    user: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
    firstname: PropTypes.string.isRequired,
    surname: PropTypes.string.isRequired,
    mutuals: PropTypes.number,
    avatar: PropTypes.string
  }).isRequired,
  basedOnMutuals: PropTypes.bool,
}

export default MonTopInfo
