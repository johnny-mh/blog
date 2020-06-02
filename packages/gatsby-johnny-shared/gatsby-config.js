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
      facebook: website.facebook,
    },
    plugins: [
      {
        resolve: 'gatsby-source-filesystem',
        options: { path: './src/images' },
      },
      {
        resolve: 'gatsby-plugin-react-svg',
        options: { rule: { include: /images\/.*\.svg$/ } },
      },
      {
        resolve: 'gatsby-source-filesystem',
        options: { name: 'post', path: './content/posts' },
      },
      {
        resolve: 'gatsby-source-filesystem',
        options: { name: 'page', path: './content/pages' },
      },
      'gatsby-plugin-sass',
      'gatsby-plugin-styled-components',
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
              options: { maxWidth: 1366, showCaptions: ['alt'] },
            },
          ],
        },
      },
      {
        resolve: 'gatsby-plugin-manifest',
        options: {
          name: website.title,
          short_name: website.titleAlt,
          description: website.description,
          start_url: pathPrefix,
          background_color: website.backgroundColor,
          theme_color: website.themeColor,
          display: 'standalone',
          icon: website.favicon,
        },
      },
      {
        resolve: 'gatsby-plugin-google-analytics',
        options: {
          trackingId: website.googleAnalyticsID,
        },
      },
      'gatsby-plugin-sitemap',
      {
        resolve: 'gatsby-plugin-feed',
        options: {
          query: `
            {
              site {
                siteMetadata {
                  title
                  description
                  siteUrl
                  site_url: siteUrl
                }
              }
            }
          `,
          feeds: [
            {
              serialize: ({ query: { site, allMarkdownRemark } }) => {
                return allMarkdownRemark.edges.map((edge) => {
                  return Object.assign({}, edge.node.frontmatter, {
                    description: edge.node.excerpt,
                    date: edge.node.frontmatter.date,
                    url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                    guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                    custom_elements: [
                      {
                        'content:encoded': edge.node.html,
                      },
                    ],
                  })
                })
              },
              query: `
              {
                allMarkdownRemark(
                  sort: {order: DESC, fields: fields___date},
                  filter: {fields: {type: {eq: "post"}}}
                ) {
                  edges {
                    node {
                      excerpt
                      fields {
                        slug
                        date
                      }
                      frontmatter {
                        title
                      }
                      html
                    }
                  }
                }
              }
              `,
              output: '/rss.xml',
              title: `${website.url} RSS Feed`,
            },
          ],
        },
      },
      {
        resolve: 'gatsby-plugin-robots-txt',
        options: {
          host: website.url,
          sitemap: `${website.url}/sitemap.xml`,
          policy: [{ userAgent: '*', allow: '/' }],
        },
      },
    ],
  }
}
