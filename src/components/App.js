import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getUnreadNotifications} from '../actions/notification'
import {getUnreadMessages} from '../actions/message'
import axios from 'axios'
import Notify from 'handy-notification'
import { withRouter } from 'react-router-dom';
import 'regenerator-runtime/runtime'

import Header from './others/header/header'
import HeaderPublic from './others/header/header-public'
import NotiSpeak from './others/noti-speak'
import SideBar from './others/sidebar/sidebar'
import AppRoutes from './App-routes'
import '../styles/styles.scss'
import {getAuth} from "../utils/user-system-utils";
import {setSessionUser} from "../actions/user";

axios.defaults.baseURL = process.env.REACT_APP_BASE_API_URL;
const token = localStorage.getItem('token')
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

class App extends Component {
  componentDidMount = async () => {
    let {dispatch, isLoggedIn} = this.props

    if (token) {
      const auth = await getAuth()
      if (auth.success) {
        dispatch(setSessionUser(auth.user))
        this.props.history.push('/')
      }
    }

    if (!isLoggedIn) {
      return
    } else {
      this.props.history.push('/')
    }

    dispatch(getUnreadNotifications())
    dispatch(getUnreadMessages())
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.errorMessage !== prevProps.errorMessage) {
      Notify({ value: this.props.errorMessage })
    }
  }

  renderHeader = () => {
    let {unreadNotifications, unreadMessages, isLoggedIn} = this.props

    if (isLoggedIn) {
      return (
        <div>
          <Header/>
          <NotiSpeak un={unreadNotifications}/>
          <SideBar un={unreadNotifications} uc={unreadMessages}/>
        </div>
      )
    } else {
      return (
        <HeaderPublic/>
      )
    }
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <div className="app">
        {this.renderHeader()}
        <AppRoutes isLoggedIn={isLoggedIn}/>
      </div>
    )
  }
}

const mapStateToProps = store => ({
  unreadNotifications: store.Notification.unreadNotifications,
  unreadMessages: store.Message.unreadMessages,
  isLoggedIn: store.User.session.id,
  errorMessage: store.Error.message
})

export default withRouter(connect(mapStateToProps)(App))
export {App as PureApp}
