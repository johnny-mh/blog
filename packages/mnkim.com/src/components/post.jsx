import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import { FadeLink } from 'gatsby-johnny-shared'
import { isEmpty, isNil } from 'lodash'
import { DateTime } from 'luxon'
import PropTypes from 'prop-types'
import React from 'react'
import styled, { css } from 'styled-components'

import TagIcon from '../images/tag.svg'

export const query = graphql`
  fragment Post on MarkdownRemark {
    id
    html
    frontmatter {
      title
      categories
      tags
      featuredImage {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
      featuredImageCaption
    }
    fields {
      slug
      date
    }
  }
`

const StyledFeatured = styled.div`
  padding: 0 0 80px;

  figure {
    margin: 0;
  }

  figcaption {
    font-size: 12px;
    line-height: 1.68em;
    text-align: center;
    padding-top: 18px;
  }

  @media only screen and (max-width: 960px) {
    margin-left: -100px;
    margin-right: -100px;
    width: auto !important;
  }
`

const Featured = ({
  frontmatter: { title, featuredImage, featuredImageCaption },
}) => {
  let featured = null

  if (featuredImage) {
    let content

    if (featuredImageCaption) {
      content = (
        <figure>
          <Img
            fluid={featuredImage.childImageSharp.fluid}
            alt={featuredImageCaption}
          />
          <figcaption>{featuredImageCaption}</figcaption>
        </figure>
      )
    } else {
      content = <Img fluid={featuredImage.childImageSharp.fluid} alt={title} />
    }

    featured = <StyledFeatured>{content}</StyledFeatured>
  }

  return featured
}

const ArticleMeta = css`
  margin: 0 0 28px;

  * {
    font-family: 'Montserrat', sans-serif;
    text-transform: uppercase;
    line-height: 1.6em;
    letter-spacing: 1px;
    font-weight: 400;
    font-style: normal;
    font-size: 12px;
    color: #a8a8a8;
  }

  > span + span {
    padding-left: 5px;
  }
`

const StyledPostHeader = styled.header`
  text-align: center;

  .headline {
    margin: 0 0 28px;
    font-size: 27px;
    font-weight: bold;
  }

  .article-meta {
    ${ArticleMeta}
  }
`

const PostHeader = ({ frontmatter, fields: { slug, date } }) => {
  let categories = null

  if (!isNil(frontmatter.categories) && !isEmpty(frontmatter.categories)) {
    categories = (
      <span>
        in{' '}
        {frontmatter.categories
          .map((cat) => (
            <FadeLink to={'/post/category/' + cat} rel="tag" key={cat}>
              {cat}
            </FadeLink>
          ))
          .reduce((prev, curr) => [prev, ', ', curr])}
      </span>
    )
  }

  return (
    <StyledPostHeader>
      <h1 className="headline" itemProp="headline">
        <FadeLink to={slug}>{frontmatter.title}</FadeLink>
      </h1>
      <div className="article-meta">
        <span className="date">
          <time
            className="published"
            dateTime={DateTime.fromISO(date).toFormat('DDD')}
            itemProp="datePublished">
            {DateTime.fromISO(date).toFormat('DDD')}
          </time>
        </span>
        {categories}
      </div>
    </StyledPostHeader>
  )
}

export const postPropTypes = {
  id: PropTypes.string,
  html: PropTypes.string,
  frontmatter: PropTypes.shape({
    title: PropTypes.string,
    categories: PropTypes.arrayOf(PropTypes.string),
    tags: PropTypes.arrayOf(PropTypes.string),
    featuredImage: PropTypes.any,
    featuredImageCaption: PropTypes.string,
  }),
  fields: PropTypes.shape({
    slug: PropTypes.string,
    date: PropTypes.string,
  }),
}

PostHeader.propTypes = postPropTypes

const StyledPostFooter = styled.footer`
  ${ArticleMeta}
  text-align: center;
  margin: 20px 0 0 0;

  a {
    font-family: 'Nanum Myeongjo', serif;
  }

  .tags {
    font-size: 0.8em;

    .icon-tag {
      display: inline-block;
      margin-right: 4px;
      width: 14px;
      height: 14px;
      margin-top: -4px;
      line-height: inherit;
      vertical-align: middle;
    }
  }
`

const PostFooter = (props) => {
  const {
    frontmatter: { tags },
  } = props

  if (!tags || (tags && isEmpty(tags))) {
    return null
  }

  return (
    <StyledPostFooter>
      <div>
        <div className="tags">
          <TagIcon className="icon-tag" />
          {tags
            .map((tag) => (
              <Link to={`/post/tag/${tag}`} rel="tag" key={tag}>
                {tag}
              </Link>
            ))
            .reduce((prev, curr) => [prev, ', ', curr])}
        </div>
      </div>
    </StyledPostFooter>
  )
}

PostFooter.propTypes = postPropTypes

const StyledPost = styled.div`
  .markdown-content {
    max-width: 750px;
    margin: 0 auto;
    padding-bottom: 60px;
  }
`

const Post = (props) => {
  const meta = []

  if (!isEmpty(props.frontmatter.tags)) {
    meta.push({
      name: 'keywords',
      content: props.frontmatter.tags,
    })
  }

  return (
    <StyledPost>
      <Featured {...props} />
      <div className="markdown-content">
        <PostHeader {...props} />
        <div dangerouslySetInnerHTML={{ __html: props.html }}></div>
        <PostFooter {...props} />
      </div>
    </StyledPost>
  )
}

Post.propTypes = postPropTypes

export default Post
