import { FadeLink, SEO } from 'gatsby-johnny-shared'
import React from 'react'
import styled from 'styled-components'

import Layout from '../components/layout'

const StyledNotFound = styled.div`
  text-align: center;
  min-height: 50vh;

  h1 {
    font-weight: 700;
    font-family: Montserrat, sans-serif;
    font-size: 100px;
    color: #a8a8a8;
    margin-bottom: 28px;
  }

  p {
    margin: 0 0 28px;
  }

  a {
    font-weight: bold;
  }
`

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <StyledNotFound>
      <div id="content">
        <h1>404</h1>
        <p>페이지를 찾을 수 없습니다</p>
        <p>
          <FadeLink to="/">홈으로</FadeLink>
        </p>
      </div>
    </StyledNotFound>
  </Layout>
)

export default NotFoundPage
