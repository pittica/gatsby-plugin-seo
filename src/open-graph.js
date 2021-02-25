import React from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';
import PropTypes from 'prop-types';

const OpenGraph = ({ url, title, article, description, image }) => {
  const { site: { siteMetadata }, siteBuildMetadata } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            locale {
              language
              culture
            }
          }
        }
        siteBuildMetadata {
          fields {
            seo {
              socials {
                facebook {
                  page
                  app
                }
              }
            }
          }
        }
      }
    `
  );
  const facebook = siteBuildMetadata.fields.seo.socials.facebook;

  return (
    <Helmet>
      <meta property="og:url" content={url} />
      {article ? <meta property="og:type" content="article" /> : null}
      <meta property="og:title" content={title} />
      <meta
        property="og:locale"
        content={[ siteMetadata.locale.language.toLowerCase(), siteMetadata.locale.culture.toUpperCase() ].join('_')}
      />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={siteMetadata.title} />
      {image ? <meta property="og:image" content={image} /> : null}
      {facebook.app ? <meta property="fb:app_id" content={facebook.app} /> : null}
      {article && facebook.page ? (
        <meta property="article:publisher" content={'https://www.facebook.com/' + facebook.page} />
      ) : null}
    </Helmet>
  );
};

OpenGraph.propTypes = {
  url: PropTypes.string,
  article: PropTypes.bool,
  image: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};

OpenGraph.defaultProps = {
  url: null,
  article: false,
  image: null,
  title: null,
  description: null
};

export default OpenGraph;
