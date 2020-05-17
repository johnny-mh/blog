import { SEO } from 'gatsby-johnny-shared'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

export const pageQuery = graphql`
  query($id: String) {
    markdownRemark(id: { eq: $id }) {
      html
    }
  }
`

const StyledPageTemplate = styled.div`
  .markdown-content {
    max-width: 750px;
    margin: 0 auto;
    padding-bottom: 60px;
  }
`

const PageTemplate = ({
  data: {
    markdownRemark: { html },
  },
  pageContext: { pageTitle },
}) => {
  return (
    <Layout>
      <SEO title={pageTitle} />
      <StyledPageTemplate>
        <div
          className="markdown-content"
          dangerouslySetInnerHTML={{ __html: html }}></div>
      </StyledPageTemplate>
    </Layout>
  )
}

PageTemplate.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      html: PropTypes.string,
    }),
  }),
  pageContext: PropTypes.shape({
    pageTitle: PropTypes.string,
  }),
}

export default PageTemplate
