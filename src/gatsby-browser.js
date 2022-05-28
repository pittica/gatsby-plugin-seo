import React, { Fragment } from "react"
import { Helmet, HelmetProvider } from "react-helmet-async"
import { joinLocale, formatLocale, withUrl } from "@pittica/gatsby-plugin-utils"

import SocialContext from "./context/social-context"
import Organization from "./components/ld-json/organization"
import Website from "./components/ld-json/website"
import TwitterCard from "./components/twitter-card"
import OpenGraph from "./components/open-graph"

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
        {description && (
          <meta
            name="description"
            content={description}
            key="html-description"
          />
        )}
        {image && <meta name="image" content={image} key="html-image" />}
        {facebook.app && (
          <meta property="fb:app_id" content={facebook.app} key="fb-app-id" />
        )}
        {!debug && <base href={siteUrl} />}
      </Helmet>
      <OpenGraph
        url={location.href || withUrl(location.pathname, siteUrl)}
        title={title}
        description={description}
        image={image}
        locale={locale}
        site={title}
      />
      <TwitterCard
        title={title}
        description={description}
        image={image}
        username={twitter.username}
        site={twitter.site || twitter.username}
      />
      <Website url={siteUrl} description={description} name={title} />
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
