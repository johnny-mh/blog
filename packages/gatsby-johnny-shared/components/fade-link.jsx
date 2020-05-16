import AniLink from 'gatsby-plugin-transition-link/AniLink'
import PropTypes from 'prop-types'
import React from 'react'

const FadeLink = props => {
  let { children, ..._props } = props

  _props = {
    ..._props,
    fade: true,
    duration: 0.2,
    activeClassName: 'active'
  }

  const onClick = () => {
    if (props.stt) {
      window.scrollTo(0, 0)
    }
  }

  return (
    <AniLink {..._props} onClick={onClick}>
      {children}
    </AniLink>
  )
}

FadeLink.propTypes = {
  stt: PropTypes.bool,
  children: PropTypes.node.isRequired
}

export default FadeLink
