import React from 'react'
import PropTypes from 'prop-types'
import elephant from '../../images/elephant-march.png'
import larg from '../../images/large.jpg'

const Nothing = props => {
  let { mssg, showMssg, secondMssg, conPage } = props

  return (
    <div className="home_last_mssg" style={{ border: !showMssg ? 'none' : '' }}>
      <img src={`${conPage ? elephant : larg}`} />
      {showMssg ? <span className="nothingMssg">{mssg}</span> : null}
      <span className="secondMssg">{secondMssg}</span>
    </div>
  )
}

Nothing.defaultProps = {
  mssg: 'Hello, a message for you!!',
  showMssg: true,
  secondMssg: '',
  conPage: false,
}

Nothing.propTypes = {
  mssg: PropTypes.string,
  showMssg: PropTypes.bool,
  secondMssg: PropTypes.string,
  conPage: PropTypes.bool,
}

export default Nothing
