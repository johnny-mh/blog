module.exports = {
  plugins: [
    'gatsby-plugin-sass',
    {
      resolve: 'gatsby-johnny-shared',
      options: { website: require('./website') }
    }
  ]
}
