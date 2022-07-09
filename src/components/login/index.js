import React, {Fragment, useEffect, useState} from 'react';
import { connect } from "react-redux";
import axios from 'axios'

import AppLink from "../others/link/link";
import {loginError, setSessionUser} from "../../actions/user";
import {login} from "../../utils/user-system-utils";

const Login = ({ dispatch, auth, history }) => {
  const [data, setData] = useState({username: '', password: ''})

  const handleInputChange = (e) => {
    const { target: { name, value } } = e
    setData({ ...data, [name]: value })
  }

  useEffect(() => {
    if (auth) {
      history.push('/')
    }
  }, [auth])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { token, message, user} = await login(data)
    if (token) {
      localStorage.setItem('token', token)
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }
      dispatch(setSessionUser(user))
    } else {
      dispatch(loginError(message))
    }
  }

  return (
    <Fragment>
      <div className="notes_wrapper">

        <div className="log_sign">
          <AppLink url='/signup' class='pri_btn' label='Need an account?'/>
        </div>

        <div className="register cua">
          <div className="display_text">
            <span>Get started again</span>
          </div>
          <form className="form_login" onSubmit={handleSubmit} method="POST">
            <input type="text" name="username" onChange={handleInputChange} value={data.username} className="l_username" autoFocus required spellCheck="false"
              autoComplete='false' placeholder='Username' />
            <input type="password" name="password" onChange={handleInputChange} value={data.password} className="l_password" id='l_password' required
              placeholder='Password' autoComplete='new-password'/>
            <span className="show_psswrd s_p_l">
              <i className="fas fa-lock"/>
            </span>
            <input type="submit" name="" value="Login To Continue" className="l_submit" />
          </form>
          <div className="forgot_psswrd">
            <AppLink url='/forgot-password' class='a_pri' alt="Forgot your password" label='Forgot your password?'/>
          </div>
        </div>

      </div>
    </Fragment>
  );
}

const mapStateToProps = state => ({
  auth: state.User.session.id
})
export default connect(mapStateToProps)(Login)
