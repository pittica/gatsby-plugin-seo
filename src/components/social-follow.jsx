import React, { useContext } from "react"
import PropTypes from "prop-types"

import SocialLink from "./social-link"
import SocialContext from "../context/social-context"

export default function SocialFollow({ className }) {
  const { facebook, twitter, github, instagram, linkedin, youtube } =
    useContext(SocialContext)

  return (
    <ul className={className}>
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
      {youtube && youtube.show && (
        <SocialLink
          name="YouTube"
          icon={youtube.icon}
          url="https://www.youtube.com/user/"
          page={youtube.username}
        />
      )}
    </ul>
  )
}

SocialFollow.propTypes = {
  className: PropTypes.string,
}

SocialFollow.defaultProps = {
  className: "social-follow",
}
