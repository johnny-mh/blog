module.exports = {
  plugins: [
    {
      resolve: 'gatsby-johnny-shared',
      options: { website: require('./website') },
    },
    {
      resolve: 'gatsby-plugin-prefetch-google-fonts',
      options: {
        fonts: [
          {
            family: 'Josefin Sans',
          },
          {
            family: 'Montserrat',
            variants: ['400', '700'],
          },
          {
            family: 'Nanum Myeongjo',
            variants: ['400', '700'],
          },
        ],
      },
    },
  ],
}
