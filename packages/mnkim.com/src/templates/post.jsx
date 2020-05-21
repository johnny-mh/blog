import { graphql } from 'gatsby'
import { Pager, SEO } from 'gatsby-johnny-shared'
import PropTypes from 'prop-types'
import React from 'react'

import Layout from '../components/layout'
import Post, { postPropTypes } from '../components/post'

export const pageQuery = graphql`
  query($pageId: String!) {
    markdownRemark(id: { eq: $pageId }) {
      ...Post
    }
  }
`

const PostTemplate = ({ data, pageContext }) => (
  <Layout>
    <SEO
      title={data.markdownRemark.frontmatter.title}
      keywords={data.markdownRemark.frontmatter.tags}
    />
    <Post {...data.markdownRemark} />
    <Pager {...pageContext} font={'400 14px "Josefin Sans", sans-serif'} />
  </Layout>
)

PostTemplate.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape(postPropTypes),
  }),
  pageContext: PropTypes.any,
}

export default PostTemplate
