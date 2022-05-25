import React from "react"
import { Helmet } from "react-helmet-async"
import PropTypes from "prop-types"
import { withUrl } from "@pittica/gatsby-plugin-utils"

export default function Webpage({
  author,
  siteUrl,
  datePublished,
  defaultTitle,
  description,
  image,
  isBlogPost,
  organization,
  title,
  url,
  headline,
}) {
  const entity = {
    "@context": "http://schema.org",
    "@type": isBlogPost ? "BlogPosting" : "WebPage",
    url: withUrl(url, siteUrl),
    name: title,
    description,
    mainEntityOfPage: {
      "@type": "WebSite",
      "@id": siteUrl,
    },
  }

  if (image) {
    entity.image = {
      "@type": "ImageObject",
      url: withUrl(image, siteUrl),
    }
  }

  if (organization?.name) {
    entity.publisher = {
      "@type": "Organization",
      url: organization.url,
      logo: organization.logo,
      name: organization.name,
    }
  }

  if (isBlogPost) {
    entity.alternateName = defaultTitle
    entity.headline = headline
    entity.datePublished = datePublished

    if (author) {
      entity.author = {
        "@type": "Person",
        name: author,
        url: siteUrl,
      }
    }
  }

  return (
    <Helmet>
      <script type="application/ld+json" key="ld-json-schemaorg">
        {JSON.stringify(entity)}
      </script>
    </Helmet>
  )
}

Webpage.propTypes = {
  author: PropTypes.string,
  siteUrl: PropTypes.string,
  datePublished: PropTypes.any,
  defaultTitle: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  isBlogPost: PropTypes.bool,
  organization: PropTypes.object,
  title: PropTypes.string,
  url: PropTypes.string,
  headline: PropTypes.string,
}

Webpage.defaultProps = {
  isBlogPost: false,
  organization: {},
}
