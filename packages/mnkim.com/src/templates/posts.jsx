import { Pager, SEO } from 'gatsby-johnny-shared'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import Post from '../components/post'
import PropTypes from 'prop-types'
import React from 'react'

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
    <SEO title="blog" />
    {data.allMarkdownRemark.edges.map(({ node }) => (
      <Post {...node} key={node.id} />
    ))}
    <Pager {...pageContext} />
  </Layout>
)

PostsTemplate.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array
    })
  }),
  pageContext: PropTypes.shape({
    ids: PropTypes.arrayOf(PropTypes.string)
  })
}

export default PostsTemplate
