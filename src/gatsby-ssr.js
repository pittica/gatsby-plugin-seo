import React from "react"
import { HelmetProvider } from "react-helmet-async"

import SocialContext from "./context/social-context"

export { wrapPageElement } from "./gatsby-browser"

const helmetContext = {}

export function wrapRootElement({ element }, pluginOptions) {
  return (
    <HelmetProvider context={helmetContext}>
      <SocialContext.Provider value={pluginOptions}>
        {element}
      </SocialContext.Provider>
    </HelmetProvider>
  )
}

export function onRenderBody({
  setHtmlAttributes,
  setBodyAttributes,
  setHeadComponents,
}) {
  const { helmet } = helmetContext

  if (helmet) {
    setHeadComponents([
      helmet.base.toComponent(),
      helmet.title.toComponent(),
      helmet.meta.toComponent(),
      helmet.link.toComponent(),
      helmet.style.toComponent(),
      helmet.script.toComponent(),
      helmet.noscript.toComponent(),
    ])

    if (setHtmlAttributes) {
      setHtmlAttributes(helmet.htmlAttributes.toComponent())
    }

    if (setBodyAttributes) {
      setBodyAttributes(helmet.bodyAttributes.toComponent())
    }
  }
}
