import React, { useContext } from "react"
import { Helmet } from "react-helmet-async"
import PropTypes from "prop-types"
import { withUrl } from "@pittica/gatsby-plugin-utils"

import SocialContext from "../../context/social-context"

export default function Breadcrumb({ title, url, image, items }) {
  const { siteUrl } = useContext(SocialContext)
  const itemListElement = []
  let position = 1

  for (let i = 0; i < items.length; i++) {
    if (items[i].url) {
      itemListElement.push({
        "@type": "ListItem",
        position: position++,
        item: {
          "@id": withUrl(items[i].url, siteUrl),
          name: items[i].name,
          image: items[i].image,
        },
      })
    }
  }

  itemListElement.push({
    "@type": "ListItem",
    position,
    item: {
      "@id": withUrl(url, siteUrl),
      name: title,
      image,
    },
  })

  return (
    <Helmet>
      <script type="application/ld+json" key="ld-json-breadcrumb">
        {JSON.stringify({
          "@context": "http://schema.org",
          "@type": "BreadcrumbList",
          itemListElement,
        })}
      </script>
    </Helmet>
  )
}

Breadcrumb.propTypes = {
  title: PropTypes.string,
  url: PropTypes.string,
  image: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.object),
}

Breadcrumb.defaultProps = {
  items: [],
}
