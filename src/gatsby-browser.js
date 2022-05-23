import React, { Fragment } from "react"
import { Helmet, HelmetProvider } from "react-helmet-async"
import { joinLocale, formatLocale, withUrl } from "@pittica/gatsby-plugin-utils"

import SocialContext from "./context/social-context"
import Organization from "./components/ld-json/organization"

export function wrapPageElement(
  { element, props: { location } },
  { image, description, socials, siteUrl, title, locale, organization, debug }
) {
  if (!organization.url) {
    organization.url = siteUrl
  }

  if (!organization.name) {
    organization.name = title
  }

  if (!organization.logo) {
    organization.logo = image
  }

  const { facebook, twitter } = socials

  return (
    <Fragment>
      <Helmet
        htmlAttributes={{
          lang: locale.language,
        }}
      >
        {image && <meta name="image" content={image} />}
        {facebook.app && <meta property="fb:app_id" content={facebook.app} />}
        <meta
          property="og:url"
          content={location.href || withUrl(location.pathname, siteUrl)}
        />
        {title && <meta property="og:title" content={title} />}
        {title && <meta property="og:site_name" content={title} />}
        {description && (
          <meta property="og:description" content={description} />
        )}
        {locale && (
          <meta
            property="og:locale"
            content={joinLocale(formatLocale(locale))}
          />
        )}
        {image && <meta property="og:image" content={image} />}
        <meta name="twitter:card" content="summary_large_image" />
        {title && <meta name="twitter:title" content={title} />}
        {description && (
          <meta name="twitter:description" content={description} />
        )}
        {(twitter.site || twitter.username) && (
          <meta
            name="twitter:site"
            content={twitter.site || twitter.username}
          />
        )}
        {twitter.username && (
          <meta name="twitter:creator" content={twitter.username} />
        )}
        {image && <meta name="twitter:image" content={image} />}
        {!debug && <base href={siteUrl} />}
      </Helmet>
      <Organization organization={organization} socials={socials} />
      {element}
    </Fragment>
  )
}

export function wrapRootElement({ element }, pluginOptions) {
  return (
    <HelmetProvider>
      <SocialContext.Provider value={pluginOptions}>
        {element}
      </SocialContext.Provider>
    </HelmetProvider>
  )
}
