import React from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';
import PropTypes from 'prop-types';

const TwitterCard = ({ title, description, image }) => {
  const { siteBuildMetadata } = useStaticQuery(
    graphql`
      query {
        siteBuildMetadata {
          fields {
            seo {
              socials {
                twitter {
                  username
                  site
                }
              }
            }
          }
        }
      }
    `
  );

  const twitter = siteBuildMetadata.fields.seo.socials.twitter;

  return (
    <Helmet>
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {image ? <meta name="twitter:image" content={image} /> : null}
      {twitter.site ? <meta name="twitter:site" content={twitter.site} /> : null}
      {twitter.creator ? <meta name="twitter:creator" content={twitter.creator} /> : null}
    </Helmet>
  );
};

TwitterCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string
};

TwitterCard.defaultProps = {
  title: null,
  description: null,
  image: null
};

export default TwitterCard;
