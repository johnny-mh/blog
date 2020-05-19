const visit = require('unist-util-visit')
const build = require('unist-builder')
// const remove = require(`unist-util-remove`)

module.exports = ({ markdownAST, markdownNode: { frontmatter } }) => {
  markdownAST.children.unshift(
    build(
      'html',
      `<input type="hidden" id="opt" value="${encodeURIComponent(
        JSON.stringify({
          hello: 'world',
        })
      )}" />`
    )
  )

  visit(markdownAST, 'html', (node) => {
    if (node.value.indexOf('gatsby-resp-image') < 0) {
      return
    }

    node.value = node.value.replace(
      'gatsby-resp-image-image"',
      'gatsby-resp-image-image" data-zoomable'
    )
  })

  return markdownAST
}
