import React from "react"
import PropTypes from "prop-types"

export default function SocialLink({ name, icon, url, page }) {
  return (
    <li>
      <a href={new URL(page, url).href} title={name}>
        <i className={icon} />
        <span>{name}</span>
      </a>
    </li>
  )
}

SocialLink.propTypes = {
  url: PropTypes.string,
  name: PropTypes.string,
  icon: PropTypes.string,
  page: PropTypes.string,
}
