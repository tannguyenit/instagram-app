import React, { Component, Fragment } from 'react'
import logo from '../../../images/instagram.jpg'
import AppLink from '../link/link'

export default class HeaderPublic extends Component {
  state = {
    showOptions: false,
  }

  toggleOptions = () => this.setState({ showOptions: !this.state.showOptions })

  render() {
    let { showOptions } = this.state

    return (
      <Fragment>
        <div class="handy-notify">
          <span></span>
        </div>
        <div class="overlay-2-black"></div>
        <div class="overlay-2"></div>
        <div class="index_header">
          <div class="header_logo nh_logo">
            <AppLink url='/'>
              <img src={logo} alt="Instagram" />
            </AppLink>
            <hr />
            <span>Instagram</span>
          </div>
          <div class="right">
            <AppLink url="/welcome" label="Home"/>
            <AppLink url="/about" label="About"/>
            <AppLink url="/developer" label="Developer"/>
            <AppLink url="/login" label="Login"/>
            <AppLink url="/signup" label="Signup"/>
          </div>
        </div>
      </Fragment>
    )
  }
}
