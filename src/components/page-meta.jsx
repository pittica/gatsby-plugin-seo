import React from "react"
import { Helmet } from "react-helmet-async"
import PropTypes from "prop-types"
import { withUrl } from "@pittica/gatsby-plugin-utils"

export default function PageMeta({ siteUrl, description, image }) {
  if (description || image) {
    return (
      <Helmet>
        {description && (
          <meta
            name="description"
            content={description}
            key="html-description"
          />
        )}
        {image && (
          <meta
            name="image"
            content={withUrl(image, siteUrl)}
            key="html-image"
          />
        )}
      </Helmet>
    )
  } else {
    return null
  }
}

PageMeta.propTypes = {
  siteUrl: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
}
