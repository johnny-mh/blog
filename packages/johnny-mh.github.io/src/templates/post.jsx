import { Pager, SEO } from 'gatsby-johnny-shared'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import Post, { postPropTypes } from '../components/post'
import PropTypes from 'prop-types'
import React from 'react'

export const pageQuery = graphql`
  query($pageId: String!) {
    markdownRemark(id: { eq: $pageId }) {
      ...Post
    }
  }
`

const PostTemplate = ({ data: { markdownRemark: post }, pageContext }) => (
  <Layout>
    <SEO keywords={post.frontmatter.tags} desc={post.frontmatter.title} />
    <Post {...post} />
    <Pager {...pageContext} />
  </Layout>
)

PostTemplate.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape(postPropTypes)
  }),
  pageContext: PropTypes.any,
  location: PropTypes.any
}

export default PostTemplate
