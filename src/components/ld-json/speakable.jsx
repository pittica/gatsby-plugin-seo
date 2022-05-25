import React from "react"
import { Helmet } from "react-helmet-async"
import PropTypes from "prop-types"

export default function Speakable({ selector }) {
  if (selector.length > 0) {
    return (
      <Helmet>
        <script type="application/ld+json" key="ld-json-speakable">
          {JSON.stringify({
            Speakable: {
              "@type": "SpeakableSpecification",
              cssSelector: selector,
            },
          })}
        </script>
      </Helmet>
    )
  } else {
    return null
  }
}

Speakable.propTypes = {
  selector: PropTypes.array,
}

Speakable.defaultProps = {
  selector: [],
}
