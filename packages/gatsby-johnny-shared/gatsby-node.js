const _ = require('lodash')
const { resolve } = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const { DateTime } = require('luxon')
const { paginate, createPagePerItem } = require('gatsby-awesome-pagination')

const BLOG_POST_FILENAME_REGEX = /(\d{4})-(\d{2})-(\d{2})\/(.+)\/$/

exports.onCreateNode = ({ node, actions: { createNodeField }, getNode }) => {
  if (node.internal.type !== 'MarkdownRemark') {
    return
  }

  const slug = createFilePath({ node, getNode })
  const match = BLOG_POST_FILENAME_REGEX.exec(slug)

  if (match !== null) {
    const [, year, month, day, filename] = match
    const date = DateTime.local(Number(year), Number(month), Number(day))
    const updatedAt = node.frontmatter.updatedAt
      ? DateTime.fromISO(node.frontmatter.updatedAt).toISO()
      : null

    createNodeField({ name: 'slug', node, value: `/post/${filename}` })
    createNodeField({ name: 'type', node, value: 'post' })
    createNodeField({ name: 'date', node, value: date.toISO() })
    createNodeField({ name: 'updatedAt', node, value: updatedAt })
  } else {
    createNodeField({ name: 'slug', node, value: slug })
    createNodeField({ name: 'type', node, value: 'page' })
  }
}

/**
 * /post/{name}
 * /post/page/{page}
 */
const createEachPostAndPagedPosts = async ({
  graphql,
  actions: { createPage },
}) => {
  const {
    data: {
      allMarkdownRemark: { edges: posts },
    },
  } = await graphql(`
    {
      allMarkdownRemark(
        filter: { fields: { type: { eq: "post" } } }
        sort: { fields: fields___date, order: DESC }
      ) {
        edges {
          node {
            id
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  // /post/*
  createPagePerItem({
    createPage,
    component: resolve('./src/templates/post.jsx'),
    items: posts,
    itemToPath: 'node.fields.slug',
    itemToId: 'node.id',
  })
}

exports.createPages = async args => {
  await createEachPostAndPagedPosts(args)
}
