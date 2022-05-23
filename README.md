# pittica/gatsby-plugin-seo

![License](https://img.shields.io/github/license/pittica/gatsby-plugin-seo)
![Version](https://img.shields.io/github/package-json/v/pittica/gatsby-plugin-seo)
![Release](https://img.shields.io/github/v/release/pittica/gatsby-plugin-seo)
![Gatsby version](https://img.shields.io/npm/dependency-version/@pittica/gatsby-plugin-seo/peer/gatsby)
![React version](https://img.shields.io/github/package-json/dependency-version/pittica/gatsby-plugin-seo/react)

## Description

SEO plugin for [GatsbyJS](https://www.gatsbyjs.org/).

## Install

[![npm](https://img.shields.io/npm/v/@pittica/gatsby-plugin-seo)](https://www.npmjs.com/package/@pittica/gatsby-plugin-seo)
[![npm](https://img.shields.io/npm/dm/@pittica/gatsby-plugin-seo)](https://www.npmjs.com/package/@pittica/gatsby-plugin-seo)

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
        siteUrl: `https://my.site`,
        title: `SEO title`,
        description: `SEO description`,
        locale: {
          language: `en`,
          culture: `US`,
        },
        image: `/DEFAULT_SHARING_IMAGE.jpg`,
        organization: {
          name: `My Company Name`,
          url: `https://company.site`,
          logo: `https://company.site/logo.png`,
        },
        socials: {
          instagram: {
            username: `INSTAGRAM_USERNAME`,
            icon: `instagram-icon-class`,
            show: true,
          },
          github: {
            username: `GITHUB_USERNAME`,
            icon: `github-icon-class`,
            show: true,
          },
          facebook: {
            page: `FACEBOOK_PAGE_USERNAME`,
            app: `FACEBOOK_APP_ID`,
            icon: `facebook-icon-class`,
            show: true,
          },
          twitter: {
            username: `TWITTER_USERNAME`,
            site: `TWITTER_SITE_USERNAME`,
            icon: `twitter-icon-class`,
            show: true,
          },
          linkedin: {
            page: `LINKEDIN_PAGE_USERNAME`,
            icon: `linkedin-icon-class`,
            show: true,
          },
          debug: false,
        },
      },
    },
  ],
}
```

## Copyright

(c) 2020-2022, [Pittica S.r.l.](https://pittica.com).
