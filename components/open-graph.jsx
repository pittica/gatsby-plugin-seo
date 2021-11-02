import React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { formatLocale, joinLocale } from "@pittica/gatsby-plugin-utils"

import useOptions from "../utils/useOptions"

export default function OpenGraph({
  url,
  title,
  article,
  description,
  image,
  locale,
}) {
  const {
    site,
    defaultImage,
    socials: {
      facebook: { app, page },
    },
  } = useOptions()
  const localeContent = locale ? formatLocale(locale) : site.locale

  return (
    <Helmet>
      <meta property="og:url" content={url} />
      {article && <meta property="og:type" content="article" />}
      <meta property="og:title" content={title} />
      <meta property="og:locale" content={joinLocale(localeContent)} />
      <meta
        property="og:description"
        content={description || site.description}
      />
      <meta property="og:site_name" content={site.title} />
      {(image || defaultImage) && (
        <meta property="og:image" content={image || defaultImage} />
      )}
      {app && <meta property="fb:app_id" content={app} />}
      {article && page ? (
        <meta
          property="article:publisher"
          content={new URL(page, "https://www.facebook.com/").href}
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
