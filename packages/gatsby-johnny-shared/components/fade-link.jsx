import AniLink from 'gatsby-plugin-transition-link/AniLink'
import PropTypes from 'prop-types'
import React from 'react'

const FadeLink = ({ children, ...props }) =>
  <AniLink {...{
    ...props,
    fade: true,
    duration: 0.2,
    activeClassName: 'active'
  }}>{children}</AniLink>

FadeLink.propTypes = {
  children: PropTypes.node.isRequired
}

export default FadeLink
