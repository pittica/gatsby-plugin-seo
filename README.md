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
            username: `INSTAGRAM_USERNAME`
          },
          github: {
            username: `GITHUB_USERNAME`
          },
          facebook: {
            page: `FACEBOOK_PAGE_USERNAME`,
            app: `FACEBOOK_APP_ID`
          },
          twitter: {
            username: `TWITTER_USERNAME`,
            site: `TWITTER_SITE_USERNAME`
          }
        }
    },
  ],
}
```

## Copyright

(c) 2020, Pittaca S.r.l.s.
