import React, { Component } from 'react'
import Title from '../../../others/title'
import { FadeIn } from 'animate-components'
import { connect } from 'react-redux'
import { bottomScroll } from '../../../../utils/utils'
import AboutSections from './sections'
import SocialIcons from './social-icons'
import UpdateInstruction from './update-instruction'
import EditPen from '../../../others/edit-pen'
import d from '../../../../utils/API/DOM'

@connect(store => ({
  ud: store.User.user_details,
  auth: store.User.session
}))
export default class About extends Component {
  toggleEdit = () => new d('.a_edit').toggle()

  componentDidMount = () => bottomScroll()

  renderEditIcon = () => {
    const { ud: { id }, auth: { id: authId }} = this.props
    if (id === authId) {
      return <EditPen to="/edit-profile" when="profile" />
    }
  }

  render() {
    let { username, firstname, surname } = this.props.ud

    return (
      <div>
        <Title value={`About @${username} (${firstname} ${surname})`} />

        <FadeIn duration="300ms">
          <div className="senapati pro_senapati">
            <div className="about">
              <div className="sabout">
                <UpdateInstruction />
                <SocialIcons />
              </div>

              <div
                className="fabout"
                onMouseOver={this.toggleEdit}
                onMouseOut={this.toggleEdit}
              >
                { this.renderEditIcon() }
                <AboutSections />
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    )
  }
}
