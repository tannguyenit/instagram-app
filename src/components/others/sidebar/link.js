import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import classNames from "classnames";

const SidebarLink = ({ label, link, showNumbers, numbers }) => {
  return (
    <li className="m_n_li">
      <NavLink
        to={link}
        exact
        className={classNames('m_n_a', ({ isActive }) => (isActive ? 'sidebar_active' : ''))}
      >
        <span className="m_n_text">{label}</span>
        {showNumbers && numbers ? (
          <span className="m_n_new">{numbers > 9 ? '9+' : numbers}</span>
        ) : null}
      </NavLink>
    </li>
  )
}

SidebarLink.defaultProps = {
  showNumbers: false,
  numbers: 0,
}

SidebarLink.propTypes = {
  label: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  showNumbers: PropTypes.bool,
  numbers: PropTypes.number,
}

export default SidebarLink
