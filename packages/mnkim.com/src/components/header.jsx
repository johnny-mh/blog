import { FadeLink } from 'gatsby-johnny-shared'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const StyledHeader = styled.header`
  margin-bottom: 60px;
  text-align: center;

  > div {
    margin: 0 auto;
    max-width: 960px;
  }

  .logo {
    margin: 0 auto 28px;

    a {
      color: #404040;
      text-decoration: none;
      font-family: Montserrat, sans-serif;
      font-size: 55px;
      font-weight: 400;
      letter-spacing: 3px;
    }
  }

  .site-tagline {
    letter-spacing: 0.175rem;
    line-height: 1.8em;
    text-transform: uppercase;
    font-family: Montserrat, sans-serif;
    font-weight: 100;
    font-size: 8px;

    a:hover {
      text-decoration: none;
    }
  }

  .navigation {
    padding: 28px 0;

    ul {
      margin: 0;
      padding: 0;
      font-size: 14px;
      font-weight: 400;
      font-style: normal;
      text-transform: capitalize;
      letter-spacing: 0.95px;
      list-style: none;
      list-style-image: none;

      li {
        display: inline-block;
        text-align: center;
        margin: 0;
        padding: 0;

        a {
          color: #666;
          padding: 0 0.8em;
          text-align: center;
          text-decoration: none;
          font-family: 'Josefin Sans', sans-serif;
          font-weight: 400;
          font-size: 14px;
          letter-spacing: 0.95px;

          :hover,
          :active {
            color: #a8a8a8;
          }
        }

        a.active {
          color: #a8a8a8;
        }
      }
    }
  }
`

const Header = ({ siteTitle }) => (
  <StyledHeader>
    <div>
      <h1 className="logo">
        <FadeLink fade to="/">
          {siteTitle}
        </FadeLink>
      </h1>
      <p className="site-tagline">
        <a href="https://www.instagram.com/johnny.archives/">
          @johnny.archives
        </a>
      </p>
      <div role="navigation">
        <nav className="navigation">
          <ul>
            <li>
              <FadeLink to="/post">Post</FadeLink>
            </li>
            <li>
              <FadeLink to="/about">About</FadeLink>
            </li>
            <li>
              <FadeLink to="/archives">Archives</FadeLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </StyledHeader>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: '',
}

export default Header
