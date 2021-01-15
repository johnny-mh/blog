import { Link, graphql } from 'gatsby'
import { SEO, TOC } from 'gatsby-johnny-shared'
import { isEmpty } from 'lodash'
import { DateTime } from 'luxon'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import TagIcon from '../images/tag.svg'

export const query = graphql`
  fragment Post on MarkdownRemark {
    id
    html
    frontmatter {
      categories
      tags
      title
      featuredImage {
        publicURL
      }
    }
    fields {
      slug
      date
    }
    timeToRead
    ...TOC
  }
`

const StyledPost = styled.article`
  header {
    display: grid;
    margin-bottom: 35px;

    h1 {
      margin: 0 0 0.5rem;
    }

    .post-meta {
      margin: 0 0 0.5rem;

      * {
        text-transform: uppercase;
        line-height: 1.6em;
        letter-spacing: 1px;
        font-size: 12px;
        color: #a8a8a8;
      }

      span + span {
        padding-left: 5px;
      }

      a:hover {
        color: #333;
      }
    }

    .tags {
      font-size: 0.8em;
      color: #a8a8a8;

      a {
        color: #a8a8a8;

        :hover {
          color: #333;
        }
      }

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
  }
`

const Post = (props) => {
  const meta = []
  const { frontmatter } = props

  if (!isEmpty(frontmatter.tags)) {
    meta.push({
      name: 'keywords',
      content: frontmatter.tags,
    })
  }

  let featuredImage = null

  if (frontmatter.featuredImage && frontmatter.featuredImage.publicURL) {
    featuredImage = frontmatter.featuredImage.publicURL
  }

  return (
    <StyledPost>
      <TOC headings={props.headings} />
      {featuredImage ? <SEO image={featuredImage} /> : null}
      <header>
        <h1>{props.frontmatter.title}</h1>
        <div className="post-meta">
          <span className="date">
            <time itemProp="datePublished">
              {DateTime.fromISO(props.fields.date).toFormat('DDD')}
            </time>
          </span>
          <span className="categories">
            in{' '}
            {props.frontmatter.categories
              .map((cat) => (
                <Link to={'/post/category/' + cat} rel="tag" key={cat}>
                  {cat}
                </Link>
              ))
              .reduce((prev, curr) => [prev, ', ', curr])}
          </span>
        </div>
        <div className="tags">
          <TagIcon className="icon-tag" />
          {props.frontmatter.tags
            .map((tag) => (
              <Link to={`/post/tag/${tag}`} rel="tag" key={tag}>
                {tag}
              </Link>
            ))
            .reduce((prev, curr) => [prev, ', ', curr])}
        </div>
      </header>
      <div
        className="markdown-content"
        dangerouslySetInnerHTML={{ __html: props.html }}></div>
    </StyledPost>
  )
}

export const postPropTypes = {
  id: PropTypes.string,
  html: PropTypes.string,
  frontmatter: PropTypes.shape({
    title: PropTypes.string,
    categories: PropTypes.arrayOf(PropTypes.string),
    tags: PropTypes.arrayOf(PropTypes.string),
    featuredImage: PropTypes.shape({
      publicURL: PropTypes.string,
    }),
  }),
  fields: PropTypes.shape({
    slug: PropTypes.string,
    date: PropTypes.string,
    sortDate: PropTypes.string,
  }),
  headings: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      depth: PropTypes.number,
    })
  ),
}

Post.propTypes = postPropTypes

export default Post
