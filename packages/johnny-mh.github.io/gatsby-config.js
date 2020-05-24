module.exports = {
  plugins: [
    {
      resolve: 'gatsby-johnny-shared',
      options: { website: require('./website') },
    },
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        google: {
          families: ['Noto Sans KR:400,700', 'Montserrat:400,600:latin'],
        },
      },
    },
  ],
}
