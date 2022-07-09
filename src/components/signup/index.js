import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux'

import { checkUserName, registerUser } from '../../actions/user';
import AppLink from "../others/link/link";

const SignUp = ({ dispatch, username_exist, register_status, history }) => {
  const [data, setData] = useState({
    username: '',
    firstname: '',
    surname: '',
    email: '',
    password: '',
  })

  const [error, setError] = useState({
    title: '',
    icon: '',
    display: ''
  })
  useEffect(() => {
    if (register_status) {
      history.push('/login')
    }
  }, [register_status])

  useEffect(() => {
    if (data.username === '') {
      setError({
        title: '',
        icon: '',
        display: 'none'
      })
      return
    }

    if (username_exist) {
      setError({
        title: 'username not available',
        icon: 'far fa-frown',
        display: 'block'
      })
    } else {
      setError({
        title: 'username available',
        icon: 'far fa-smile',
        display: 'block'
      })
    }
  }, [username_exist])

  const handleInputChange = (e) => {
    const { target: { name, value } } = e
    setData({ ...data, [name]: value })
    if (name === 'username') {
      dispatch(checkUserName(value))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(data))
  }

  return (
    <Fragment>
      <div className="notes_wrapper">
        <div className="log_sign">
          <AppLink url='/login' className="pri_btn" label='Already have an account?'/>

        </div>
        <div className="register cua ">
          <div className="display_text">
            <span>Get started now and let the fun begins</span>
          </div>
          <form className="form_register" onSubmit={handleSubmit} method="POST">
            <input type="text" name="username" onChange={handleInputChange} value={data.username} className="s_username filter_illegal" autoFocus spellCheck="false" placeholder='Username' required />
            <div className="username_checker"style={ { display: error.display }}>
              <span className="checker_text">{error.title}</span>
              <span className="checker_icon">
                <i className={error.icon}/>
              </span>
            </div>
            <input type="text" name="firstname" onChange={handleInputChange} value={data.firstname} autoComplete="off" placeholder="First name" className="s_firstname small_input filter_illegal" spellCheck="false" maxLength="20" required />
            <input type="text" name="surname" onChange={handleInputChange} value={data.surname} autoComplete="off" placeholder="Surname" className="s_surname small_input filter_illegal" spellCheck="false" maxLength="20" required />
            <input type="email" name="email" onChange={handleInputChange} value={data.email} className="s_email" spellCheck="false" autoComplete='false' placeholder='Email' required />
            <input type="password" name="password" onChange={handleInputChange} value={data.password} id='s_password' className="s_password" placeholder='Password' autoComplete='new-password' required />
            <span className="show_psswrd s_p_s">
              <i className="fas fa-lock"/>
            </span>
            <div className="terms_div">
              <input type="checkbox" id="s_terms" name="s_terms" className="s_terms" required />
              <label for="s_terms" className="terms">I agree to
                <a href="/terms" className="a_pri">Instagram Terms</a>
              </label>
            </div>
            <input type="submit" name="" value="Signup For Free" className="s_submit" disabled={username_exist}/>
          </form>
        </div>
      </div>
    </Fragment>
  );
}

const mapStateToProps = state => ({
  username_exist: state.User.username_exist,
  register_status: state.User.register_status,
})

export default connect(mapStateToProps)(SignUp)
export { SignUp as PureSignUp }
