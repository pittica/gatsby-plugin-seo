import React from "react"
import { Helmet } from "react-helmet-async"
import PropTypes from "prop-types"

export default function Website({ url, name, description }) {
  return (
    <Helmet>
      <script type="application/ld+json" key="ld-json-website">
        {JSON.stringify({
          "@context": "http://schema.org",
          "@type": "WebSite",
          url,
          name,
          description,
        })}
      </script>
    </Helmet>
  )
}

Website.propTypes = {
  url: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
}
