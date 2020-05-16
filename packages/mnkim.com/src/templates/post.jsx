import { graphql } from 'gatsby'
// import { paginateContext } from '../propTypes'
// import Layout from '../components/layout'
// import Pager from '../components/pager'
import Post, { postPropTypes } from '../components/post'
import PropTypes from 'prop-types'
import React from 'react'
import { SEO } from 'gatsby-johnny-shared'

export const pageQuery = graphql`
  query($pageId: String!) {
    markdownRemark(id: { eq: $pageId }) {
      ...Post
    }
  }
`

const PostTemplate = ({ data, pageContext, location }) => {
  const post = data.markdownRemark

  return (
    <div>
      <SEO
        keywords={post.frontmatter.tags}
        desc={post.frontmatter.title}
        pathname={location.pathname}
      />
      <Post {...post} />
      {/* <Pager {...pageContext} reverse={true} /> */}
    </div>
  )
}

PostTemplate.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape(postPropTypes),
  }),
  pageContext: PropTypes.any,
  location: PropTypes.any,
}

export default PostTemplate
