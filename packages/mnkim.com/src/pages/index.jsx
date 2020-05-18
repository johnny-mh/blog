import { SEO } from 'gatsby-johnny-shared'
import { graphql } from 'gatsby'
import Post from '../components/post'
import PropTypes from 'prop-types'
import React from 'react'

import Layout from '../components/layout'

export const query = graphql`
  {
    allMarkdownRemark(
      filter: { fields: { type: { eq: "post" } } }
      sort: { fields: frontmatter___date, order: DESC }
      limit: 2
    ) {
      edges {
        node {
          ...Post
        }
      }
    }
  }
`

const IndexPage = ({ data }) => (
  <Layout>
    <SEO />
    {data.allMarkdownRemark.edges.map(({ node }) => (
      <Post {...node} key={node.id} />
    ))}
  </Layout>
)

IndexPage.propTypes = {
  data: PropTypes.any,
}

export default IndexPage
