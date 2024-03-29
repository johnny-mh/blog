const _ = require('lodash')
const { resolve } = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const { DateTime } = require('luxon')
const { paginate, createPagePerItem } = require('gatsby-awesome-pagination')

const POST_FILENAME_REGEX = /(\d{4})-(\d{2})-(\d{2})-(.+)\/$/

exports.onCreateNode = ({ node, actions: { createNodeField }, getNode }) => {
  if (node.internal.type !== 'MarkdownRemark') {
    return
  }

  const slug = createFilePath({ node, getNode })
  const match = POST_FILENAME_REGEX.exec(slug)

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

const getTags = async ({ graphql }) => {
  if (getTags.memo) {
    return getTags.memo
  }

  const {
    data: {
      allMarkdownRemark: { group: _tags },
    },
  } = await graphql(`
    {
      allMarkdownRemark {
        group(field: frontmatter___tags) {
          name: fieldValue
          totalCount
        }
      }
    }
  `)

  const tags = _.chain(_tags)
    .orderBy(['totalCount', 'name'], ['desc', 'asc'])
    .slice(0, 40)
    .map(({ name, totalCount }, id) => ({ id, name, totalCount }))
    .value()

  getTags.memo = tags

  return tags
}

/**
 * /post/{name}
 * /post/page/{page}
 */
const createEachPostAndPagedPosts = async ({
  graphql,
  actions: { createPage },
}) => {
  let result = await graphql(`
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
    items: result.data.allMarkdownRemark.edges,
    itemToPath: 'node.fields.slug',
    itemToId: 'node.id',
  })

  // /post/page/*
  paginate({
    createPage,
    items: result.data.allMarkdownRemark.edges,
    itemsPerPage: 10,
    pathPrefix: ({ pageNumber }) => (pageNumber === 0 ? '/post' : '/post/page'),
    component: resolve('./src/templates/posts.jsx'),
    context: { ids: _.map(result.data.allMarkdownRemark.edges, 'node.id') },
  })

  // /post/category/*
  result = await graphql(`
    {
      allMarkdownRemark {
        group(field: frontmatter___categories) {
          name: fieldValue
        }
      }
    }
  `)

  for (const categoryName of _.map(
    result.data.allMarkdownRemark.group,
    'name'
  )) {
    result = await graphql(`
      {
        allMarkdownRemark(
          filter: {frontmatter: {categories: {in: "${categoryName}"}}},
          sort: {fields: fields___date, order: DESC}
        ) {
          edges {
            node {
              id
            }
          }
        }
      }`)

    paginate({
      createPage,
      items: result.data.allMarkdownRemark.edges,
      itemsPerPage: 10,
      pathPrefix: ({ pageNumber }) =>
        pageNumber === 0
          ? `/post/category/${categoryName}`
          : `/post/category/${categoryName}/page`,
      component: resolve('./src/templates/posts.jsx'),
      context: {
        ids: _.map(result.data.allMarkdownRemark.edges, 'node.id'),
      },
    })
  }

  // /post/tag/*
  const _tags = await getTags({ graphql })

  for (const { name } of _tags) {
    const result = await graphql(`
      {
        allMarkdownRemark(
          filter: {frontmatter: {tags: {in: "${name}"}}},
          sort: {fields: fields___date, order: DESC}
        ) {
          edges {
            node {
              id
            }
          }
        }
      }`)

    paginate({
      createPage,
      items: result.data.allMarkdownRemark.edges,
      itemsPerPage: 2,
      pathPrefix: ({ pageNumber }) =>
        pageNumber === 0 ? `/post/tag/${name}` : `/post/tag/${name}/page`,
      component: resolve('./src/templates/posts.jsx'),
      context: {
        ids: _.map(result.data.allMarkdownRemark.edges, 'node.id'),
      },
    })
  }
}

/**
 * /{name}
 */
const createPages = async ({ graphql, actions: { createPage } }) => {
  const result = await graphql(`
    {
      allMarkdownRemark(filter: { fields: { type: { eq: "page" } } }) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              title
            }
          }
        }
      }
    }
  `)

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    const path = node.fields.slug.replace(/^\/pages/, '')

    createPage({
      path,
      component: resolve('./src/templates/page.jsx'),
      context: { id: node.id },
    })
  })
}

/**
 * /archives
 */
const createArchives = async ({ graphql, actions: { createPage } }) => {
  const tags = await getTags({ graphql })
  let result = await graphql(`
    {
      allMarkdownRemark {
        group(field: frontmatter___categories) {
          name: fieldValue
          totalCount
        }
      }
    }
  `)

  const categories = _.chain(result.data.allMarkdownRemark.group)
    .orderBy(['totalCount', 'name'], ['desc', 'asc'])
    .slice(0, 30)
    .map(({ name, totalCount }, id) => ({ id, name, totalCount }))
    .value()

  result = await graphql(`
    {
      allMarkdownRemark(
        filter: { fields: { type: { eq: "post" } } }
        sort: { order: DESC, fields: fields___date }
      ) {
        nodes {
          id
          frontmatter {
            title
          }
          fields {
            slug
            date
          }
        }
      }
    }
  `)

  const groups = _.chain(result.data.allMarkdownRemark.nodes)
    .map((o) => ({
      id: o.id,
      date: o.fields.date,
      title: o.frontmatter.title,
      path: o.fields.slug,
    }))
    .groupBy((o) => DateTime.fromISO(o.date).year)
    .entries()
    .orderBy([0], 'desc')
    .reduce(
      (arr, [year, list]) =>
        arr.concat({
          year,
          groupName: `${year} (${list.length})`,
          list,
        }),
      []
    )
    .value()

  createPage({
    path: '/archives',
    component: resolve('./src/templates/archives.jsx'),
    context: { tags, categories, groups },
  })
}

exports.createPages = async (args) => {
  await createEachPostAndPagedPosts(args)
  await createPages(args)
  await createArchives(args)
}
