require('dotenv').config()

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
          families: [
            'Nanum Myeongjo:400,700',
            'Josefin Sans:400:latin',
            'Montserrat:200,400:latin',
          ],
        },
      },
    },
    {
      resolve: 'gatsby-plugin-s3',
      options: {
        bucketName: 'mnkim.com',
        acl: null,
      },
    },
  ],
}
