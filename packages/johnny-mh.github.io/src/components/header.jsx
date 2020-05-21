import { FadeLink } from 'gatsby-johnny-shared'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import logoBlack from '../images/black.png'

const StyledHeader = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 3;
  width: 100%;
  background: #fff;

  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 160px;
    transition: height 80ms ease-out;
  }

  .logo {
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
  }

  .links {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    height: 100%;

    a {
      display: flex;
      align-items: center;
      font-family: Montserrat, serif;
      font-weight: 600;
      padding: 0.75rem;
      margin: 0 0.25rem;
      color: #333;
      line-height: 1.2;
      text-align: center;
      border-radius: 6px;
      text-decoration: none;

      :hover {
        color: #000;
      }
    }
  }

  &.scroll {
    box-shadow: 1px 2px 18px rgba(0, 0, 0, 0.1);

    .container {
      height: 80px;
    }
  }
`

const Header = () => {
  const [scrolled, setScrolled] = useState(false)
  const onScroll = () => setScrolled(window.scrollY > 20)

  useEffect(() => {
    window.addEventListener('scroll', onScroll)

    return () => window.removeEventListener('scroll', onScroll)
  })

  return (
    <StyledHeader className={scrolled ? 'scroll' : ''}>
      <div className="container">
        <div className="brand">
          <FadeLink to="/">
            <img src={logoBlack} className="logo" alt="JOHNNY DEV" />
          </FadeLink>
        </div>
        <div className="links">
          <FadeLink to="/about">About</FadeLink>
          <FadeLink to="/archives">Archives</FadeLink>
        </div>
      </div>
    </StyledHeader>
  )
}

export default Header
