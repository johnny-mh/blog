import RSSIcon from '../images/rss.svg'
import React from 'react'
import styled from 'styled-components'

const StyledFooter = styled.footer`
  text-align: center;
  font-size: 14px;
  line-height: 1.7em;

  .buttons {
    margin-bottom: 30px;

    svg {
      width: 11px;
      height: 11px;
    }
  }

  .author {
    font-weight: bold;
  }

  @media only screen and (max-width: 640px) {
    font-size: 12px;
  }
`

export const Footer = () => {
  return (
    <StyledFooter>
      <p className="buttons">
        <a href="/rss.xml">
          <RSSIcon />
        </a>
      </p>
      <p>
        Ⓒ {new Date().getFullYear()} Copyright{' '}
        <a className="author" href="mailto:romz1212@gmail.com">
          MinHyeong Kim
        </a>
        . All rights reserved.
        <br />
        사이트의 모든 사진은 저작권의 보호를 받습니다.
      </p>
    </StyledFooter>
  )
}
