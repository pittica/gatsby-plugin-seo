import React, { Fragment } from "react"
import { Helmet, HelmetProvider } from "react-helmet-async"
import { withUrl } from "@pittica/gatsby-plugin-utils"

import SocialContext from "./context/social-context"
import Organization from "./components/ld-json/organization"
import Website from "./components/ld-json/website"
import TwitterCard from "./components/twitter-card"
import OpenGraph from "./components/open-graph"
import extract from "./utils/extract"

export function wrapPageElement(
  { element, props: { location, data } },
  {
    image,
    description,
    socials,
    siteUrl,
    title,
    locale,
    organization,
    fields,
    resolve,
    debug,
  }
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
  const seo = extract(data, { title, description, image, fields, resolve })

  return (
    <Fragment>
      <Helmet
        htmlAttributes={{
          lang: locale.language,
        }}
      >
        {seo.description && (
          <meta
            name="description"
            content={seo.description}
            key="html-description"
          />
        )}
        {seo.image && (
          <meta
            name="image"
            content={withUrl(seo.image, siteUrl)}
            key="html-image"
          />
        )}
        {facebook.app && (
          <meta property="fb:app_id" content={facebook.app} key="fb-app-id" />
        )}
        {!debug && <base href={siteUrl} />}
      </Helmet>
      <OpenGraph
        url={location.href || withUrl(location.pathname, siteUrl)}
        title={seo.title}
        description={seo.description}
        image={seo.image}
        locale={locale}
        site={title}
      />
      <TwitterCard
        title={seo.title}
        description={seo.description}
        image={seo.image}
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
