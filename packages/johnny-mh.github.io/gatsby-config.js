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
            family: 'Montserrat',
            variants: ['400', '600'],
          },
          {
            family: 'Noto Sans KR',
            variants: ['400', '700'],
          },
        ],
      },
    },
  ],
}
