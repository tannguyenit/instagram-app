import React, { Fragment } from 'react'
import { Switch, Route, Redirect } from 'react-router'

import Profile from './profile/profile'
import Home from './home/home'
import EmailVerification from './email-verification/email-verification'
import Notifications from './notifications/notifications'
import EditProfile from './edit-profile/edit-profile'
import ViewPost from './post/view-post/view-post'
import Explore from './explore/explore'
import Settings from './settings/settings'
import Group from './group/group'
import Messages from './messages/messages'
import Hashtag from './hashtag/hashtag/hashtag'
import AdminLogin from './admin/admin-login'
import IsAdmin from './admin/is-admin'
import Error from './error/error'
import Login from './login'
import Welcome from './welcome'
import About from './about'
import ForgotPassword from './forgot-password'
import SignUp from './signup'
import Developer from './developer'

const PrivateRoute = ({ component: Component, isLoggedIn, ...rest }) => (
  <Route {...rest} render={(props) => (
    isLoggedIn ? <Component {...props} /> : <Redirect to='/login' />
  )} />
)
const AppRoutes = ({ isLoggedIn }) => (
  <Fragment>
    <div className={isLoggedIn ? "badshah" : ''}>
      <Switch>
        <Route path="/login" exact component={Login} />
        <Route path="/welcome" exact component={Welcome} />
        <Route path="/about" exact component={About} />
        <Route path="/developer" exact component={Developer} />
        <Route path="/signup" exact component={SignUp} />
        <Route path="/forgot-password" exact component={ForgotPassword} />
        <PrivateRoute isLoggedIn={isLoggedIn} path="/" exact component={Home} />
        <PrivateRoute isLoggedIn={isLoggedIn} path="/profile/:username" component={Profile} />
        <PrivateRoute isLoggedIn={isLoggedIn} path="/error/:what" component={Error} />
        <PrivateRoute isLoggedIn={isLoggedIn} path="/email-verification/:is" component={EmailVerification} />
        <PrivateRoute isLoggedIn={isLoggedIn} path="/notifications" component={Notifications} />
        <PrivateRoute isLoggedIn={isLoggedIn} path="/edit-profile" component={EditProfile} />
        <PrivateRoute isLoggedIn={isLoggedIn} path="/post/:post_id" component={ViewPost} />
        <PrivateRoute isLoggedIn={isLoggedIn} path="/explore" component={Explore} />
        <PrivateRoute isLoggedIn={isLoggedIn} path="/settings" component={Settings} />
        <PrivateRoute isLoggedIn={isLoggedIn} path="/group/:grp_id" component={Group} />
        <PrivateRoute isLoggedIn={isLoggedIn} path="/messages" component={Messages} />
        <PrivateRoute isLoggedIn={isLoggedIn} path="/hashtag/:hashtag" component={Hashtag} />
        <PrivateRoute isLoggedIn={isLoggedIn} path="/admin-login" component={AdminLogin} />
        <PrivateRoute isLoggedIn={isLoggedIn} path="/is-admin" component={IsAdmin} />
        <Route component={Error} />
      </Switch>
    </div>
  </Fragment>
)

export default AppRoutes
