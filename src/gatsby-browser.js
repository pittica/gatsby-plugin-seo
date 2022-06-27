import React, { Fragment } from "react"
import { Helmet, HelmetProvider } from "react-helmet-async"
import { withUrl, searchArray } from "@pittica/gatsby-plugin-utils"

import SocialContext from "./context/social-context"
import Organization from "./components/ld-json/organization"
import Website from "./components/ld-json/website"
import TwitterCard from "./components/twitter-card"
import OpenGraph from "./components/open-graph"
import extract from "./utils/extract"
import Links from "./components/links"
import PageMeta from "./components/page-meta"

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
        title={seo.title || title}
        titleTemplate={seo.title ? `%s | ${title}` : title}
      >
        {facebook.app && (
          <meta property="fb:app_id" content={facebook.app} key="fb-app-id" />
        )}
        {!debug && <base href={siteUrl} />}
      </Helmet>
      <PageMeta
        siteUrl={siteUrl}
        description={seo.description}
        image={seo.image}
      />
      <Links
        siteUrl={siteUrl}
        path={location.href || withUrl(location.pathname, siteUrl)}
        next={searchArray(fields.next, data)}
        previous={searchArray(fields.previous, data)}
      />
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
