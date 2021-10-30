import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import PropTypes from "prop-types"

import SocialLink from "./social-link"

export default function SocialFollow({ className }) {
  const {
    sitePlugin: {
      pluginOptions: {
        socials: { facebook, twitter, github, instagram, linkedin },
      },
    },
  } = useStaticQuery(
    graphql`
      query SocialFollow {
        sitePlugin(name: { eq: "@pittica/gatsby-plugin-seo" }) {
          pluginOptions
        }
      }
    `
  )

  return (
    <div className={className}>
      <ul className="social-follow">
        {facebook && facebook.show && (
          <SocialLink
            name="Facebook"
            icon={facebook.icon}
            url="https://www.facebook.com/"
            page={facebook.page}
          />
        )}
        {instagram && instagram.show && (
          <SocialLink
            name="Instagram"
            icon={instagram.icon}
            url="https://instagram.com/"
            page={instagram.username}
          />
        )}
        {twitter && twitter.show && (
          <SocialLink
            name="Twitter"
            icon={twitter.icon}
            url="https://twitter.com/"
            page={twitter.username}
          />
        )}
        {linkedin && linkedin.show && (
          <SocialLink
            name="LinkedIn"
            icon={linkedin.icon}
            url="https://www.linkedin.com/company/"
            page={linkedin.page}
          />
        )}
        {github && github.show && (
          <SocialLink
            name="GitHub"
            icon={github.icon}
            url="https://github.com/"
            page={github.username}
          />
        )}
      </ul>
    </div>
  )
}

SocialFollow.propTypes = {
  className: PropTypes.string,
}