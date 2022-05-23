import React, { useContext } from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet-async"
import { formatLocale, joinLocale, withUrl } from "@pittica/gatsby-plugin-utils"

import SocialContext from "../context/social-context"

export default function OpenGraph({
  title,
  article,
  description,
  image,
  locale,
}) {
  const {
    socials: {
      facebook: { page },
    },
    siteUrl,
  } = useContext(SocialContext)

  return (
    <Helmet>
      {article && <meta property="og:type" content="article" />}
      {title && <meta property="og:title" content={title} />}
      {locale && (
        <meta property="og:locale" content={joinLocale(formatLocale(locale))} />
      )}
      {description && <meta property="og:description" content={description} />}
      {image && <meta property="og:image" content={withUrl(image, siteUrl)} />}
      {article && page ? (
        <meta
          property="article:publisher"
          content={withUrl(page, "https://www.facebook.com/")}
        />
      ) : null}
    </Helmet>
  )
}

OpenGraph.propTypes = {
  title: PropTypes.string,
  article: PropTypes.bool,
  image: PropTypes.string,
  description: PropTypes.string,
  locale: PropTypes.any,
}

OpenGraph.defaultProps = {
  article: false,
}
