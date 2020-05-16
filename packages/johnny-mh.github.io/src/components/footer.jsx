import GithubIcon from '../images/github.svg'
import MailIcon from '../images/mail.svg'
import React from 'react'
import styled from 'styled-components'

const StyledFooter = styled.footer`
  margin: 60px auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 100px;

  div {
    display: flex;
    align-items: center;

    a {
      font-family: Montserrat, sans-serif;
      font-weight: 600;
      color: #333;
      text-decoration: none;

      :hover {
        color: #000;

        svg path {
          fill: #000;
        }
      }
    }

    a + a {
      padding-left: 11px;
    }
  }

  svg.github {
    width: 24px;
    height: 24px;
  }

  svg.mail {
    width: 20px;
    height: 20px;
  }
`

const Footer = () => (
  <StyledFooter className="container">
    <div>
      <a href="/rss.xml" target="_blank">
        RSS
      </a>
    </div>
    <div>
      <a href="https://github.com/johnny-mh" target="_blank" rel="noopener noreferrer">
        <GithubIcon className="github" />
      </a>
      <a href="mailto://romz1212@gmail.com">
        <MailIcon className="mail" />
      </a>
    </div>
  </StyledFooter>
)

export default Footer
