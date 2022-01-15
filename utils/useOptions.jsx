import { useStaticQuery, graphql } from "gatsby"

import withUrl from "./withUrl"

export default function useOptions() {
  const {
    site: { siteMetadata },
    sitePlugin: {
      pluginOptions: { image, socials },
    },
  } = useStaticQuery(
    graphql`
      query SeoPluginOptions {
        site {
          siteMetadata {
            title
            description
            siteUrl
            locale {
              language
              culture
            }
            author
            organization {
              company
              url
              logo
            }
          }
        }
        sitePlugin(name: { eq: "@pittica/gatsby-plugin-seo" }) {
          pluginOptions {
            image
            socials {
              facebook {
                app
                page
                icon
                show
              }
              github {
                username
                icon
                show
              }
              instagram {
                username
                icon
                show
              }
              linkedin {
                page
                icon
                show
              }
              twitter {
                username
                site
                icon
                show
              }
              youtube {
                username
                icon
                show
              }
            }
          }
        }
      }
    `
  )

  if (!siteMetadata.locale.language && !siteMetadata.locale.culture) {
    siteMetadata.locale = {
      language: "en",
      culture: "US",
    }
  }

  return {
    site: siteMetadata,
    defaultImage: withUrl(image, siteMetadata.siteUrl),
    socials,
  }
}
