import React, { Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import MaterialIcon from '../icons/material-icon'
import {connect} from "react-redux"
import Avatar from '../../avatar'

const HeaderTopLinks = ({ auth }) => {
  const { username, avatar } = auth

  return (
    <Fragment>
      <NavLink
        to="/notifications"
        activeClassName="ha_active"
        className="notification"
      >
        <span className="notification_span nav_icon">
          <MaterialIcon icon="notifications_none" />
        </span>
        <span className="links_span">Notifications</span>
      </NavLink>

      <NavLink
        to={`/profile/${username}`}
        activeClassName="ha_active"
        className="sp"
      >
        <Avatar avatar={avatar}/>
        <span className="sp_span">{username}</span>
      </NavLink>
    </Fragment>
  )
}
const mapStateToProps = state => ({
  auth: state.User.session
})
export default connect(mapStateToProps)(HeaderTopLinks)
