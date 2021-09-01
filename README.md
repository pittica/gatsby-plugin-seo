# pittica/gatsby-plugin-seo

![License](https://img.shields.io/github/license/pittica/gatsby-plugin-seo)
![Version](https://img.shields.io/github/package-json/v/pittica/gatsby-plugin-seo)
![Release](https://img.shields.io/github/v/release/pittica/gatsby-plugin-seo)
![GitHub package.json dependency version (dev dep on branch)](https://img.shields.io/github/package-json/dependency-version/pittica/gatsby-plugin-seo/dev/gatsby)
![GitHub package.json dependency version (dev dep on branch)](https://img.shields.io/github/package-json/dependency-version/pittica/gatsby-plugin-seo/dev/react)

## Description

SEO plugin for [GatsbyJS](https://www.gatsbyjs.org/).

## Install

[![npm](https://img.shields.io/npm/v/@pittica/gatsby-plugin-seo)](https://www.npmjs.com/package/@pittica/gatsby-plugin-seo)

```shell
npm install @pittica/gatsby-plugin-seo
```

## Usage

The plugin provides SEO optimization.

## Configuration

Edit your **gatsby-config.js**.

```javascript
module.exports = {
  plugins: [
    {
      resolve: `@pittica/gatsby-plugin-seo`,
      options: {
        image: `/DEFAULT_SHARING_IMAGE.jpg`,
        socials: {
          instagram: {
            username: `INSTAGRAM_USERNAME`,
            icon: `instagram-icon-class`,
            show: true
          },
          github: {
            username: `GITHUB_USERNAME`,
            icon: `github-icon-class`,
            show: true
          },
          facebook: {
            page: `FACEBOOK_PAGE_USERNAME`,
            app: `FACEBOOK_APP_ID`,
            icon: `facebook-icon-class`,
            show: true
          },
          twitter: {
            username: `TWITTER_USERNAME`,
            site: `TWITTER_SITE_USERNAME`,
            icon: `twitter-icon-class`,
            show: true
          },
          linkedin: {
            page: `LINKEDIN_PAGE_USERNAME`,
            icon: `linkedin-icon-class`,
            show: true
          }
        }
      }
    },
  ],
}
```

## Copyright

(c) 2020-2021, [Pittica S.r.l.s.](https://pittica.com).
