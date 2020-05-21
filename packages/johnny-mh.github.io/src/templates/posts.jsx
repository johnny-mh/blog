import { graphql } from 'gatsby'
import { Pager, SEO } from 'gatsby-johnny-shared'
import PropTypes from 'prop-types'
import React from 'react'

import Layout from '../components/layout'
import PostList from '../components/post-list'

export const pageQuery = graphql`
  query($skip: Int!, $limit: Int!, $ids: [String!]) {
    allMarkdownRemark(
      filter: { id: { in: $ids } }
      sort: { fields: [fields___date], order: DESC }
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

const PostsTemplate = ({
  data: {
    allMarkdownRemark: { edges: posts },
  },
  pageContext,
}) => (
  <Layout>
    <SEO title="post" />
    <PostList posts={posts} />
    <Pager {...pageContext} />
  </Layout>
)

PostsTemplate.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
  pageContext: PropTypes.any,
}

export default PostsTemplate
