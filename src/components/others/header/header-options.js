import React from 'react'
import PropTypes from 'prop-types'
import AppLink from '../link/link'

const HeaderOptions = (props) => {
  console.log(props, '===========')
  const { toggleOptions } = props
  let clicked = () => toggleOptions()

  const logOut = () => {
    localStorage.removeItem('token')
    location.reload();
  }

  return (
    <div className="sp_options options">
      <ul className="o_ul">
        <li className="o_li" onClick={clicked}>
          <AppLink
            url="/settings"
            className="o_a"
            alt="Settings"
            label="Settings"
          />
        </li>
        <li className="o_li" onClick={clicked}>
          <AppLink
            url="/edit-profile"
            className="o_a"
            alt="Edit"
            label="Edit"
          />
        </li>
        <li className="o_li">
          <a href="/help" className="o_a" alt="Help">
            Help
          </a>
        </li>
        <li className="o_li">
          <a href="/about">About</a>
        </li>
        <li className="o_li">
          <a href="/developer">Developer</a>
        </li>
        <li className="o_li o_divider">
          <hr className="menu_divider" />
        </li>
        <li className="o_li" onClick={logOut}>
          <a href="#" className="o_a">
            Logout
          </a>
        </li>
      </ul>
    </div>
  )
}

HeaderOptions.propTypes = {
  toggleOptions: PropTypes.func.isRequired,
}

export default HeaderOptions
