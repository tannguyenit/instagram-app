import React from 'react'
import AppLink from '../link/link'
import logo from '../../../images/instagram.jpg'

const HeaderLogo = () => (
  <div className="logo">
    <AppLink url="/">
      <img src={ logo } alt="Instagram" />
    </AppLink>
  </div>
)

export default HeaderLogo
