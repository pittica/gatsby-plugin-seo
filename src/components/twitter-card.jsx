import React, { useContext } from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet-async"
import { withUrl } from "@pittica/gatsby-plugin-utils"

import SocialContext from "../context/social-context"

export default function TwitterCard({ title, description, image }) {
  const { siteUrl } = useContext(SocialContext)

  return (
    <Helmet>
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={withUrl(image, siteUrl)} />}
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
