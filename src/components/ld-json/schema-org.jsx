import React, { useContext } from "react"
import { Helmet } from "react-helmet-async"
import PropTypes from "prop-types"

import SocialContext from "../../context/social-context"

function getOrganization({ url, logo, name }) {
  if (name) {
    const { socials } = useContext(SocialContext)

    return {
      "@type": "Organization",
      url,
      logo,
      name,
    }
  } else {
    return null
  }
}

export default function SchemaOrg({
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
}) {
  const baseSchema = [
    {
      "@context": "http://schema.org",
      "@type": "WebSite",
      url,
      name: title,
      alternateName: defaultTitle,
    },
  ]

  const schema = isBlogPost
    ? [
        ...baseSchema,
        {
          "@context": "http://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              item: {
                "@id": url,
                name: title,
                image,
              },
            },
          ],
        },
        {
          "@context": "http://schema.org",
          "@type": "BlogPosting",
          url,
          name: title,
          alternateName: defaultTitle,
          headline: title,
          image: {
            "@type": "ImageObject",
            url: image,
          },
          description,
          author: {
            "@type": "Person",
            name: author.name,
          },
          publisher: getOrganization(organization),
          mainEntityOfPage: {
            "@type": "WebSite",
            "@id": siteUrl,
          },
          datePublished,
        },
      ]
    : baseSchema

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  )
}

SchemaOrg.propTypes = {
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
}

SchemaOrg.defaultProps = {
  isBlogPost: false,
}
