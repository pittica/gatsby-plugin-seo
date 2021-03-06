import React from "react";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";
import PropTypes from "prop-types";

const TwitterCard = ({ title, description, image }) => {
  const {
    sitePlugin: {
      pluginOptions: {
        socials: {
          twitter: { site, username },
        },
      },
    },
  } = useStaticQuery(
    graphql`
      query {
        sitePlugin(name: { eq: "@pittica/gatsby-plugin-seo" }) {
          pluginOptions {
            socials {
              twitter {
                site
                username
              }
            }
          }
        }
      }
    `
  );

  return (
    <Helmet>
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {image ? <meta name="twitter:image" content={image} /> : null}
      {site ? <meta name="twitter:site" content={site} /> : null}
      {username ? <meta name="twitter:creator" content={username} /> : null}
    </Helmet>
  );
};

TwitterCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string,
};

TwitterCard.defaultProps = {
  title: null,
  description: null,
  image: null,
};

export default TwitterCard;
