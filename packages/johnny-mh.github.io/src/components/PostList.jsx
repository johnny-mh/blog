import { DateTime } from 'luxon'
import { Link, graphql } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import TimeIcon from '../images/time.svg'
import styled from 'styled-components'

export const query = graphql`
  fragment PostList on MarkdownRemark {
    id
    frontmatter {
      title
    }
    fields {
      slug
      date
    }
    timeToRead
  }
`

const StyledPostList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;

  li {
    margin-bottom: 0.5rem;
    line-height: 2rem;
    padding: 0.75rem 1rem;
    border-bottom: 1px solid #ebebeb;
    position: relative;

    :last-of-type {
      border-bottom: 1px solid transparent;
    }

    h4 {
      margin: 0;
      padding: 0;

      a {
        color: #333;
        text-decoration: none;

        :hover {
          color: #000;
        }

        :before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          right: 0;
          bottom: 0;
        }
      }
    }

    .meta {
      font-size: 0.8rem;
      color: #a8a8a8;
      font-weight: 700;

      svg {
        width: 11px;
        height: 11px;
      }

      span + span {
        padding-left: 11px;
      }

      .updated {
        color: #db4c69;
      }
    }
  }
`

const PostList = ({ posts }) => (
  <StyledPostList>
    {posts.map(({ node: post }) => (
      <li key={post.id}>
        <article>
          <h4 itemProp="headline">
            <Link to={post.fields.slug}>{post.frontmatter.title}</Link>
          </h4>
          <div className="meta">
            <span>
              {DateTime.fromISO(post.fields.date).toFormat('DDD')}
            </span>
            <span>
              <TimeIcon /> {post.timeToRead}분 소요
            </span>
            {post.frontmatter.updatedAt ? (
              <span className="updated">※ 업데이트</span>
            ) : null}
          </div>
        </article>
      </li>
    ))}
  </StyledPostList>
)

PostList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({ node: PropTypes.any }))
}

export default PostList
