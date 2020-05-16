import LeftIcon from '../images/left.svg'
import RightIcon from '../images/right.svg'

import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const StyledPager = styled.nav`
  height: 56px;
  margin-bottom: 30px;

  ul {
    text-align: center;

    li {
      font-size: 14px;
      font-family: Montserrat, sans-serif;
      font-weight: 600;
      display: inline-block;
      *display: block;
      *zoom: 1;
      height: 56px;
      line-height: 56px;
      white-space: nowrap;
      margin: 0 10px;

      svg {
        margin-top: -3px;
        width: 21px;
        height: 21px;
        vertical-align: middle;
      }

      a {
        color: #333;
        text-decoration: none;

        svg {
          fill: #333;
        }
      }

      a:hover {
        color: #000;

        svg {
          fill: #000;
        }
      }

      span {
        cursor: not-allowed;
        color: #888;

        svg {
          fill: #888;
        }
      }
    }
  }
`

const Pager = ({ previousPagePath, nextPagePath }) => (
  <StyledPager>
    <ul>
      <li className="prev">
        {previousPagePath ? (
          <Link to={previousPagePath}>
            <LeftIcon className="icon-tag" />
            Newer
          </Link>
        ) : (
          <span>
            <LeftIcon className="icon-tag" />
            Newer
          </span>
        )}
      </li>
      <li className="next">
        {nextPagePath ? (
          <Link to={nextPagePath}>
            Older
            <RightIcon className="icon-tag" />
          </Link>
        ) : (
          <span>
            Older
            <RightIcon className="icon-tag" />
          </span>
        )}
      </li>
    </ul>
  </StyledPager>
)

Pager.propTypes = {
  previousPagePath: PropTypes.string,
  nextPagePath: PropTypes.string
}

export default Pager
