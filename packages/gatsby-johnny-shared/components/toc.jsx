import { findIndex, head, last, throttle } from 'lodash'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import Sticky from 'react-stickynode'
import scrollToElement from 'scroll-to-element'
import slugger from 'github-slugger'
import styled from 'styled-components'

export const query = graphql`
  fragment TOC on MarkdownRemark {
    headings {
      value
      depth
    }
  }
`

const StyledToc = styled.div`
  width: 100%;
  position: relative;
  font-size: 0.9rem;

  .wrapper {
    position: absolute;
    left: 100%;
    width: 280px;
    margin: 0 0 0 4rem;

    ol {
      list-style: none;
      list-style-position: inside;
      margin: 0;
      padding: 0;

      li {
        border-left: 2px solid #ccc;
      }

      a {
        color: #888;
        text-decoration: none;

        :hover {
          color: #333;
        }
      }

      .active {
        border-color: #888;
      }

      .active a {
        font-weight: 700;
        color: #333;
      }
    }
  }
`

const TOC = ({ headings }) => {
  let skipScrollEvent = false
  const [currentIndex, setCurrentIndex] = useState(0)
  const onClick = ({ target }) => {
    const idx = target.dataset.idx
    const href = target.getAttribute('href')

    if (!href || !idx) {
      return
    }

    skipScrollEvent = true

    scrollToElement(href, { offset: -100, duration: 300 }).on('end', () => {
      setCurrentIndex(Number(idx))
      skipScrollEvent = false
    })
  }
  const headers = headings
    .filter(({ depth }) => depth < 3)
    .map(h => ({ ...h, slug: slugger.slug(h.value) }))

  useEffect(() => {
    const offsets = headers.map(({ slug }) =>
      Math.max(0, document.getElementById(slug).offsetTop - 300)
    )
    const maxIndex = offsets.length - 1
    const onScroll = throttle(() => {
      if (skipScrollEvent) {
        return
      }

      const { scrollY } = window

      let index = 0

      if (scrollY === 0 || scrollY <= head(offsets)) {
        index = 0
      } else if (
        window.innerHeight + scrollY >= document.body.offsetHeight - 30 ||
        scrollY >= last(offsets)
      ) {
        index = maxIndex
      } else {
        index = findIndex(offsets, offset => offset > scrollY) - 1
      }

      setCurrentIndex(index)
    }, 300)

    window.addEventListener('scroll', onScroll)

    return () => window.removeEventListener('scroll', onScroll)
  })

  return (
    <StyledToc>
      <Sticky top={100}>
        { /* eslint-disable-next-line */ }
        <div className="wrapper" onClick={onClick} onKeyDown={onClick}>
          <ol>
            {headers.map(({ value, depth }, idx) => (
              <li
                key={idx}
                style={{ paddingLeft: `${depth * 11}px` }}
                className={currentIndex === idx ? 'active' : ''}
              >
                <a data-idx={idx} href={`#${slugger.slug(value)}`}>
                  {value}
                </a>
              </li>
            ))}
          </ol>
        </div>
      </Sticky>
    </StyledToc>
  )
}

TOC.propTypes = {
  headings: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      depth: PropTypes.number.isRequired
    })
  )
}

export default TOC
