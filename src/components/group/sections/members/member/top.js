import React from 'react'
import { Me, humanReadable } from '../../../../../utils/utils'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import AppLink from '../../../../others/link/link'
import Avatar from '../../../../avatar'

const MemberTop = ({ memberDetails, gd }) => {
  let { member, avatar, username, firstname, surname, mutualUsersCount } = memberDetails
  let { admin } = gd

  return (
    <div className="m_top">
      <Avatar avatar={avatar}/>

      <div className="m_top_right">
        <AppLink url={`/profile/${username}`} label={username} />

        {member == admin && <span className="grp_admin">admin</span>}

        <span>
          {!Me(member)
            ? mutualUsersCount == 0
              ? `${firstname} ${surname}`
              : humanReadable(mutualUsersCount, 'mutual follower')
            : `${firstname} ${surname}`}
        </span>
      </div>
    </div>
  )
}

MemberTop.propTypes = {
  memberDetails: PropTypes.shape({
    member: PropTypes.number.isRequired,
    avatar: PropTypes.string,
    username: PropTypes.string.isRequired,
    firstname: PropTypes.string.isRequired,
    surname: PropTypes.string.isRequired,
    mutualUsersCount: PropTypes.number.isRequired,
  }).isRequired,
}

const mapStateToProps = state => ({
  gd: state.Group.group_details,
})

export default connect(mapStateToProps)(MemberTop)
