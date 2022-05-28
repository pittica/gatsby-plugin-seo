import React, { Fragment, useContext } from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet-async"
import { formatLocale, joinLocale, withUrl } from "@pittica/gatsby-plugin-utils"

import SocialContext from "../context/social-context"

export default function OpenGraph({
  url,
  title,
  article,
  description,
  image,
  locale,
  site,
}) {
  const {
    socials: {
      facebook: { page },
    },
    siteUrl,
  } = useContext(SocialContext)

  return (
    <Helmet>
      {article && <meta property="og:type" content="article" key="og-type" />}
      {url && (
        <meta property="og:url" content={withUrl(url, siteUrl)} key="og-url" />
      )}
      {title && <meta property="og:title" content={title} key="og-title" />}
      {locale && (
        <meta
          property="og:locale"
          content={joinLocale(formatLocale(locale))}
          key="og-locale"
        />
      )}
      {description && (
        <meta
          property="og:description"
          content={description}
          key="og-description"
        />
      )}
      {image && (
        <Fragment>
          <meta
            property="og:image"
            content={withUrl(image, siteUrl)}
            key="og-image"
          />
          {description && (
            <meta
              name="og:image:alt"
              content={description}
              key="og-image-alternative"
            />
          )}
        </Fragment>
      )}
      {site && (
        <meta property="og:site_name" content={site} key="og-site-name" />
      )}
      {article && page ? (
        <meta
          property="article:publisher"
          content={withUrl(page, "https://www.facebook.com/")}
          key="article-publisher"
        />
      ) : null}
    </Helmet>
  )
}

OpenGraph.propTypes = {
  url: PropTypes.string,
  title: PropTypes.string,
  article: PropTypes.bool,
  image: PropTypes.string,
  description: PropTypes.string,
  locale: PropTypes.any,
  site: PropTypes.string,
}

OpenGraph.defaultProps = {
  article: false,
}
