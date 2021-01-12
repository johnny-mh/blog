import { graphql } from 'gatsby'
import { SEO } from 'gatsby-johnny-shared'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import Layout from '../components/layout'
import PostList from '../components/post-list'
import Profile from '../components/profile'
import RxjsIcon from '../images/rxjs.svg'

export const query = graphql`
  {
    allMarkdownRemark(
      filter: { fields: { type: { eq: "post" } } }
      sort: { fields: fields___date, order: DESC }
      limit: 5
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            updatedAt
          }
          fields {
            slug
            date
          }
          timeToRead
        }
      }
    }
  }
`

const StyledIndex = styled.div`
  section {
    margin-bottom: 60px;
  }

  ul.opensources {
    margin: 0;
    padding: 0;

    li {
      display: flex;
      position: relative;

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

      .icon {
        display: flex;
        width: 56px;
        height: 56px;

        svg {
          width: 56px;
          height: 56px;
        }
      }

      .desc {
        margin-left: 21px;

        .travis {
          padding-left: 11px;
          vertical-align: middle;
        }
      }
    }
  }
`

const Index = ({
  data: {
    allMarkdownRemark: { edges },
  },
}) => (
  <Layout>
    <SEO />
    <Profile />
    <StyledIndex className="archive">
      <section>
        <h3>최근 포스트</h3>
        <PostList posts={edges} />
      </section>
      <section>
        <h3>오픈소스 프로젝트</h3>
        <ul className="opensources">
          <li>
            <div className="icon">
              <RxjsIcon />
            </div>
            <div className="desc">
              <h4>
                <a
                  href="https://github.com/johnny-mh/rxjs-shell"
                  target="_blank"
                  rel="noopener noreferrer">
                  rxjs-shell
                </a>
                <img
                  className="travis"
                  src="https://github.com/johnny-mh/rxjs-shell/workflows/CI/badge.svg"
                  alt="CI"
                />
              </h4>
              <div>
                NodeJS의 child_process를 rxjs의 operator로 사용할 수 있게 해
                주는 패키지
              </div>
            </div>
          </li>
        </ul>
      </section>
    </StyledIndex>
  </Layout>
)

Index.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.arrayOf(PropTypes.shape({ node: PropTypes.any })),
    }),
  }),
}
export default Index
