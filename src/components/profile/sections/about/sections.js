import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import TimeAgo from 'handy-timeago'
import AboutSection from './section'

const AboutSections = ({ ud, auth }) => {
  const isCurrentAuth = auth.id === ud.id;

  return (
    <Fragment>
      <AboutSection label="Username" value={ud.username} isDisplay/>
      <AboutSection label="Name" value={`${ud.firstname} ${ud.surname}`} isDisplay/>
      <AboutSection label="Email" value={ud.email} isDisplay/>
      <AboutSection label="Bio" value={ud.bio} isDisplay={isCurrentAuth}/>
  
      <AboutSection label="Instagram" value={ud.instagram} isLink isDisplay={isCurrentAuth}/>
      <AboutSection label="Github" value={ud.github} isLink isDisplay={isCurrentAuth}/>
      <AboutSection label="Twitter" value={ud.twitter} isLink isDisplay={isCurrentAuth}/>
      <AboutSection label="Facebook" value={ud.facebook} isLink isDisplay={isCurrentAuth}/>
      <AboutSection label="Website" value={ud.website} isLink isDisplay={isCurrentAuth}/>
      <AboutSection label="Phone" value={ud.phone} isDisplay={isCurrentAuth}/>
      <AboutSection label="Joined" value={`${TimeAgo(ud.joined)}`} />
    </Fragment>
  )
}

const mapStateToProps = state => ({
  ud: state.User.user_details,
  auth: state.User.session,
})

export default connect(mapStateToProps)(AboutSections)
