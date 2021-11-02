import React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"

import useOptions from "../utils/useOptions"
import withUrl from "../utils/withUrl"

export default function TwitterCard({ title, description, image }) {
  const {
    site,
    defaultImage,
    socials: { twitter },
  } = useOptions()

  return (
    <Helmet>
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {(image || defaultImage) && (
        <meta
          name="twitter:image"
          content={withUrl(image, site.siteUrl) || defaultImage}
        />
      )}
      {(twitter.site || twitter.username) && (
        <meta name="twitter:site" content={twitter.site || twitter.username} />
      )}
      {twitter.username && (
        <meta name="twitter:creator" content={twitter.username} />
      )}
    </Helmet>
  )
}

TwitterCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string,
}

TwitterCard.defaultProps = {
  title: null,
  description: null,
  image: null,
}
