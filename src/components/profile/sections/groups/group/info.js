import React from 'react'
import TimeAgo from 'handy-timeago'
import { object } from 'prop-types'
import AppLink from '../../../../others/link/link'
import GroupAvatarImage from '../../../../group-avatar'

const UserGroupInfo = ({ info }) => {
  let { group_id, name, member, joined_group, admin, image_url } = info

  return (
    <div className="m_top">
      <GroupAvatarImage src={image_url}/>
      <div className="m_top_right">
        <AppLink url={`/group/${group_id}`} label={name} />
        {member == admin && <span className="grp_admin">admin</span>}
        <span>{TimeAgo(joined_group)}</span>
      </div>
    </div>
  )
}

UserGroupInfo.propTypes = {
  info: object.isRequired,
}

export default UserGroupInfo
