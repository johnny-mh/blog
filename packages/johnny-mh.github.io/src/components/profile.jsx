import { graphql, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'
import React from 'react'
import styled from 'styled-components'

const StyledProfile = styled.div`
  display: flex;
  justify-content: left;
  margin-bottom: 3rem;

  .profile {
    .wrapper {
      border: 1px solid #ccc;
      padding: 5px;
      border-radius: 50%;
      opacity: 0.9;

      .gatsby-image-wrapper {
        border-radius: 50%;
        width: 120px;
      }
    }
  }

  .description {
    padding: 11px 0;
    margin-left: 11px;
    line-height: 2rem;

    h1 {
      margin: 0 0 9px;
    }

    .tags {
      span {
        border-radius: 20px;
        background-color: #555;
        color: #fff;
        font-family: Montserrat, snas-serif;
        font-size: 0.8rem;
        padding: 3px 11px;
        cursor: default;
      }

      span + span {
        margin-left: 7px;
      }
    }

    a {
      color: #333;
      text-decoration: none;
      font-size: 0.8em;
      font-family: Montserrat, sans-serif;
      font-weight: 600;

      :hover {
        color: #000;
      }
    }
  }
`

const Profile = () => {
  const {
    file: {
      childImageSharp: { fluid }
    }
  } = useStaticQuery(graphql`
    {
      file(name: { eq: "profile" }) {
        childImageSharp {
          fluid(maxWidth: 240, maxHeight: 240) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return (
    <StyledProfile>
      <div className="profile">
        <div className="wrapper">
          <Img fluid={fluid} />
        </div>
      </div>
      <div className="description">
        <h1>안녕하세요! FE개발자 김민형입니다</h1>
        <div className="tags">
          {['JavaScript', 'Angular', 'React', 'NodeJS']
            .map(str => <span key={str}>{str}</span>)
            .reduce((prev, curr) => [prev, curr])}
        </div>
        <div>
          <a href="mailto://romz1212@gmail.com">romz1212@gmail.com</a>
        </div>
      </div>
    </StyledProfile>
  )
}

export default Profile
