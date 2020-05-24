module.exports = {
  pathPrefix: '/', // Prefix for all links. If you deploy your site to example.com/portfolio your pathPrefix should be "portfolio"
  title: 'MN.KIM', // Navigation and Site Title
  titleAlt: 'MN.KIM', // Title for JSONLD
  description: '여행, 취미, 일상, 생각의 기록들',
  headline: 'MN.KIM', // Headline for schema.org JSONLD
  url: 'https://mnkim.com', // Domain of your site. No trailing slash!
  siteLanguage: 'kr', // Language Tag on <html> element
  logo: '/logo.png', // Used for SEO
  ogLanguage: 'ko_KR', // Facebook Language

  // JSONLD / Manifest
  favicon: 'packages/mnkim.com/src/images/favicon.png', // Used for manifest favicon generation
  shortName: 'MN.KIM', // shortname for manifest. MUST be shorter than 12 characters
  author: 'johnny.kim', // Author for schemaORGJSONLD
  themeColor: '#FFFFFF',
  backgroundColor: '#FFFFFF',

  twitter: '', // Twitter Username
  facebook: '', // Facebook Site Name
  googleAnalyticsID: 'UA-153662393-2',

  skipNavId: 'reach-skip-nav', // ID for the "Skip to content" a11y feature
}
