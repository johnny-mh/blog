/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import { Footer } from './footer'
import { graphql, useStaticQuery } from 'gatsby'
import Header from './header'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const StyledLayout = styled.div`
  padding: 80px;

  .content {
    margin: 0 auto;
    max-width: 1100px;
  }

  @media only screen and (max-width: 960px) {
    overflow: hidden;
    padding: 50px;
  }

  @media only screen and (max-width: 640px) {
    padding: 20px;
  }
`

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <StyledLayout>
      <Header siteTitle={data.site.siteMetadata.title} />
      <div className="content">
        <main>{children}</main>
        <Footer />
      </div>
    </StyledLayout>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
}

export default Layout
