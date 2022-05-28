import React, { Fragment, useContext } from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet-async"
import { withUrl, tail } from "@pittica/gatsby-plugin-utils"

import SocialContext from "../context/social-context"

export default function TwitterCard({
  title,
  description,
  image,
  username,
  site,
}) {
  const { siteUrl } = useContext(SocialContext)

  return (
    <Helmet>
      <meta
        name="twitter:card"
        content="summary_large_image"
        key="twitter-card"
      />
      {title && (
        <meta
          name="twitter:title"
          content={tail(title, 70)}
          key="twitter-title"
        />
      )}
      {description && (
        <meta
          name="twitter:description"
          content={tail(description, 200)}
          key="twitter-description"
        />
      )}
      {image && (
        <Fragment>
          <meta
            name="twitter:image"
            content={withUrl(image, siteUrl)}
            key="twitter-image"
          />
          {description && (
            <meta
              name="twitter:image:alt"
              content={tail(description, 420)}
              key="twitter-image-alternative"
            />
          )}
        </Fragment>
      )}
      {site && <meta name="twitter:site" content={site} key="twitter-site" />}
      {username && (
        <meta name="twitter:creator" content={username} key="twitter-creator" />
      )}
    </Helmet>
  )
}

TwitterCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string,
  username: PropTypes.string,
  site: PropTypes.string,
}

TwitterCard.defaultProps = {
  title: "",
  description: "",
  image: null,
  username: "",
  site: "",
}
