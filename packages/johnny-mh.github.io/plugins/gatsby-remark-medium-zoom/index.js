const visit = require('unist-util-visit')
// const remove = require(`unist-util-remove`)

module.exports = ({ markdownAST }) => {
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
