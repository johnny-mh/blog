module.exports = ({ website }) => {
  const pathPrefix = website.pathPrefix === '/' ? '' : website.pathPrefix

  return {
    pathPrefix: website.pathPrefix,
    siteMetadata: {
      siteUrl: website.url + pathPrefix, // For gatsby-plugin-sitemap
      pathPrefix,
      title: website.title,
      titleAlt: website.titleAlt,
      description: website.description,
      banner: website.logo,
      headline: website.headline,
      siteLanguage: website.siteLanguage,
      ogLanguage: website.ogLanguage,
      author: website.author,
      twitter: website.twitter,
      facebook: website.facebook
    },
    plugins: [
      {
        resolve: 'gatsby-source-filesystem',
        options: { path: './src/images' }
      },
      {
        resolve: 'gatsby-plugin-react-svg',
        options: { rule: { include: /images\/.*\.svg$/ } }
      },
      {
        resolve: 'gatsby-source-filesystem',
        options: { name: 'post', path: './content/posts' }
      },
      {
        resolve: 'gatsby-source-filesystem',
        options: { name: 'page', path: './content/pages' }
      },
      'gatsby-plugin-transition-link',
      'gatsby-plugin-sharp',
      'gatsby-transformer-sharp',
      {
        resolve: 'gatsby-transformer-remark',
        options: {
          plugins: [
            'gatsby-remark-prismjs',
            'gatsby-remark-autolink-headers',
            {
              resolve: 'gatsby-remark-images',
              options: { maxWidth: 1300, showCaptions: ['alt'] }
            }
          ]
        }
      }
    ]
  }
}
