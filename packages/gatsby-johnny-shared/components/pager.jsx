import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import LeftIcon from '../images/left.svg'
import RightIcon from '../images/right.svg'

const StyledPager = styled.nav`
  height: 56px;
  margin-bottom: 30px;

  ul {
    text-align: center;

    li {
      font: ${(props) => props.font || '600 14px Montserrat, sans-serif'};
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

StyledPager.propTypes = {
  font: PropTypes.string,
}

const Pager = ({ previousPagePath, nextPagePath, font }) => (
  <StyledPager font={font}>
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
  nextPagePath: PropTypes.string,
  font: PropTypes.string,
}

export default Pager
