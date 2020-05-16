import Footer from './footer'
import Header from './header'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const StyledMain = styled.main`
  margin-top: 140px;
  padding: 60px 2rem;
  min-height: calc(100vh - 360px);
`

const Layout = ({ children }) => (
  <>
    <Header />
    <StyledMain className="container">{children}</StyledMain>
    <Footer />
  </>
)

Layout.propTypes = { children: PropTypes.node }

export default Layout
