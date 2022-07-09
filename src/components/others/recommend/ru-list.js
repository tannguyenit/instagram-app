import React from 'react'
import { connect } from 'react-redux'
import { recommendUser } from '../../../utils/user-interact-utils'
import PrimaryButton from '../button/primary-btn'
import { number, string } from 'prop-types'
import ModalItemInfo from '../modal/modal-item-info'
import Avatar from '../../avatar'

const RecommendUsersList = props => {
  let { follow_to, username, firstname, surname, back, ud, avatar } = props

  let recommend = async e => {
    e.preventDefault()
    recommendUser({
      user: ud.id,
      recommend_to: follow_to,
    })
    back()
  }

  return (
    <div className="modal_items">
      <div className="modal_it_img">
        <Avatar avatar={avatar}/>
      </div>

      <div className="modal_it_content ">
        <ModalItemInfo
          info={{
            username,
            firstname,
            surname,
          }}
        />

        <div className="modal_ff">
          <PrimaryButton label="Recommend" onClick={recommend} />
        </div>
      </div>

      <hr />
    </div>
  )
}

const mapStateToProps = state => ({
  ud: state.User.user_details,
})

RecommendUsersList.propTypes = {
  follow_id: number.isRequired,
  follow_to: number.isRequired,
  username: string.isRequired,
  firstname: string.isRequired,
  surname: string.isRequired,
  avatar: string,
}

export default connect(mapStateToProps)(RecommendUsersList)
