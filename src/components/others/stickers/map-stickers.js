import React from 'react'
import PropTypes from 'prop-types'
import { FadeIn } from 'animate-components'

const MapStickers = ({ stickers, selectSticker }) => {
  const REACT_APP_BASE_API_URL = process.env.REACT_APP_BASE_API_URL

  let map_stickers = stickers.map(s => (
    <img
      key={s}
      src={`${REACT_APP_BASE_API_URL}/images/stickers/${s}`}
      className="sti_img"
      data-sticker={`sticker-${s}`}
      onClick={() => selectSticker(s)}
    />
  ))

  return <FadeIn duration="300ms">{map_stickers}</FadeIn>
}

MapStickers.propTypes = {
  stickers: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectSticker: PropTypes.func.isRequired,
}

export default MapStickers
