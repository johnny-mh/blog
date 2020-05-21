import { graphql } from 'gatsby'
import { Pager, SEO } from 'gatsby-johnny-shared'
import PropTypes from 'prop-types'
import React from 'react'

import Layout from '../components/layout'
import Post from '../components/post'

export const pageQuery = graphql`
  query($skip: Int!, $limit: Int!, $ids: [String!]) {
    allMarkdownRemark(
      filter: { id: { in: $ids } }
      sort: { fields: frontmatter___date, order: DESC }
      skip: $skip
      limit: $limit
    ) {
      edges {
        node {
          ...Post
        }
      }
    }
  }
`

const PostsTemplate = ({ data, pageContext }) => (
  <Layout>
    <SEO title="post" />
    {data.allMarkdownRemark.edges.map(({ node }) => (
      <Post {...node} key={node.id} />
    ))}
    <Pager {...pageContext} font={'400 14px "Josefin Sans", sans-serif'} />
  </Layout>
)

PostsTemplate.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
  pageContext: PropTypes.shape({
    ids: PropTypes.arrayOf(PropTypes.string),
  }),
}

export default PostsTemplate
