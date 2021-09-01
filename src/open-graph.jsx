import React from "react"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"
import PropTypes from "prop-types"
import { formatLocale, joinLocale } from "@pittica/gatsby-plugin-utils"

export default function OpenGraph({
  url,
  title,
  article,
  description,
  image,
  locale,
}) {
  const {
    site: { siteMetadata },
    sitePlugin: {
      pluginOptions: {
        socials: {
          facebook: { app, page },
        },
      },
    },
  } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            locale {
              language
              culture
            }
          }
        }
        sitePlugin(name: { eq: "@pittica/gatsby-plugin-seo" }) {
          pluginOptions {
            socials {
              facebook {
                app
                page
              }
            }
          }
        }
      }
    `
  )
  const localeContent = locale ? formatLocale(locale) : siteMetadata.locale

  return (
    <Helmet>
      <meta property="og:url" content={url} />
      {article ? <meta property="og:type" content="article" /> : null}
      <meta property="og:title" content={title} />
      <meta property="og:locale" content={joinLocale(localeContent)} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={siteMetadata.title} />
      {image ? <meta property="og:image" content={image} /> : null}
      {app ? <meta property="fb:app_id" content={app} /> : null}
      {article && page ? (
        <meta
          property="article:publisher"
          content={"https://www.facebook.com/" + page}
        />
      ) : null}
    </Helmet>
  )
}

OpenGraph.propTypes = {
  url: PropTypes.string,
  article: PropTypes.bool,
  image: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  locale: PropTypes.any,
}

OpenGraph.defaultProps = {
  url: null,
  article: false,
  image: null,
  title: null,
  description: null,
}
