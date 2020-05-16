module.exports = {
  plugins: [
    {
      resolve: '@johnny-blog/shared',
      options: { website: require('./website') },
    },
  ],
}
