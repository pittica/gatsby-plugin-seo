import React from "react"
import { Helmet } from "react-helmet-async"
import PropTypes from "prop-types"
import { withUrl } from "@pittica/gatsby-plugin-utils"

export default function Links({ siteUrl, path, next, previous }) {
  return (
    <Helmet>
      <link
        rel="canonical"
        href={withUrl(path, siteUrl)}
        key="html-canonical"
      />
      {next && (
        <link rel="next" href={withUrl(next, siteUrl)} key="html-next" />
      )}
      {previous && (
        <link
          rel="prev"
          href={withUrl(previous, siteUrl)}
          key="html-previous"
        />
      )}
    </Helmet>
  )
}

Links.propTypes = {
  siteUrl: PropTypes.string,
  path: PropTypes.string,
  next: PropTypes.string,
  previous: PropTypes.string,
}
