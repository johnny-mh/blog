import { DateTime } from 'luxon'
import { Link } from 'gatsby'
import { SEO } from 'gatsby-johnny-shared'
import Layout from '../components/layout'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const StyledArchives = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding-bottom: 60px;

  .block {
    padding: 17px;
  }

  h2 {
    font-family: 'Josefin Sans', sans-serif;
    font-weight: 700;
    margin: 0;
  }

  hr {
    border: none;
    color: #bbb;
    background-color: #bbb;
    height: 1px;
  }

  .tagcloud {
    li {
      display: inline-block;
      line-height: 1em;
      margin: 0.25em 0.5em;
    }
  }

  #archives {
    columns: 200px;
    column-gap: 60px;
    -moz-columns: 200px;
    -moz-column-gap: 60px;
    -webkit-columns: 200px;
    -webkit-column-gap: 60px;

    .group-name {
      font-size: 1.4em;
      line-height: 1.4em;
      font-family: Montserrat, sans-serif;
      display: block;
    }

    .archive-list {
      -webkit-column-break-inside: avoid;
      page-break-inside: avoid;
      break-inside: avoid;
      display: block;
      overflow: hidden;

      .archive-list-items {
        display: block;
        margin: 1.4em 0 2.8em 0;
        font-size: 1em;
        line-height: 1.4em;

        li {
          margin: 0 0 1.4em 0;

          a {
            display: block;
            margin-right: 5px;
            color: inherit !important;
          }
          span {
            display: block;
            color: #a8a8a8;
          }
        }
      }
    }
  }
`

const Archives = ({ pageContext: { tags, categories, groups } }) => {
  return (
    <Layout>
      <SEO title="archives" />
      <StyledArchives>
        <div className="block">
          <h2>By Categories</h2>
        </div>
        <div className="block">
          <ul className="tagcloud">
            {categories.map(category => (
              <li
                key={category.id}
                style={{
                  fontSize:
                    category.totalCount >= 9
                      ? '1.8em'
                      : category.totalCount >= 5
                        ? '1.4em'
                        : '1em'
                }}
              >
                <Link to={'/post/category/' + category.name}>
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="block">
          <hr />
        </div>
        <div className="block">
          <h2>By Tags</h2>
        </div>
        <div className="block">
          <ul className="tagcloud">
            {tags.map(tag => (
              <li
                key={tag.id}
                style={{
                  fontSize:
                    tag.totalCount >= 9
                      ? '1.8em'
                      : tag.totalCount >= 5
                        ? '1.4em'
                        : '1em'
                }}
              >
                <Link to={'/post/tag/' + tag.name}>{tag.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="block">
          <hr />
        </div>
        <div className="block">
          <h2>Archives</h2>
        </div>
        <div className="block">
          <ul id="archives">
            {groups.map(group => (
              <li className="archive-list" key={group.year}>
                <span className="group-name">{group.groupName}</span>
                <ul className="archive-list-items">
                  {group.list.map(item => (
                    <li key={item.id}>
                      <Link to={item.path}>{item.title}</Link>
                      <span>{DateTime.fromISO(item.date).toFormat('DDD')}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </StyledArchives>
    </Layout>
  )
}

Archives.propTypes = {
  pageContext: PropTypes.shape({
    tags: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        totalCount: PropTypes.number
      })
    ),
    categories: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        totalCount: PropTypes.number
      })
    ),
    groups: PropTypes.arrayOf(
      PropTypes.shape({
        year: PropTypes.string,
        groupName: PropTypes.string,
        list: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.string,
            date: PropTypes.string,
            title: PropTypes.string,
            path: PropTypes.string
          })
        )
      })
    )
  })
}

export default Archives
