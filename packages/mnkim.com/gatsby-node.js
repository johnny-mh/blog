exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  const typeDefs = `
    type Frontmatter @infer {
    featuredImage: File
    featuredImageCaption: String
    }

    type MarkdownRemark implements Node @infer {
    frontmatter: Frontmatter
    }
  `

  createTypes(typeDefs)
}
