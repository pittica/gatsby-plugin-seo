import React from "react"
import { Helmet } from "react-helmet-async"
import PropTypes from "prop-types"
import { withUrl } from "@pittica/gatsby-plugin-utils"

export default function Organization({
  organization: { name, url, logo },
  socials: { facebook, instagram, twitter, linkedin, github, youtube },
}) {
  const sameAs = []

  if (facebook && facebook.show) {
    sameAs.push(withUrl(facebook.page, "https://www.facebook.com/"))
  }

  if (instagram && instagram.show) {
    sameAs.push(withUrl(instagram.username, "https://instagram.com/"))
  }

  if (twitter && twitter.show) {
    sameAs.push(withUrl(twitter.username, "https://twitter.com/"))
  }

  if (linkedin && linkedin.show) {
    sameAs.push(withUrl(linkedin.page, "https://www.linkedin.com/company/"))
  }

  if (github && github.show) {
    sameAs.push(withUrl(github.username, "https://github.com/"))
  }

  if (youtube && youtube.show) {
    sameAs.push(withUrl(youtube.username, "https://www.youtube.com/user/"))
  }

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify({
          "@type": "Organization",
          url,
          name,
          logo: {
            url: logo,
            "@context": "http://schema.org",
            "@type": "ImageObject",
          },
          sameAs,
        })}
      </script>
    </Helmet>
  )
}

Organization.propTypes = {
  organization: PropTypes.object,
  socials: PropTypes.object,
}
