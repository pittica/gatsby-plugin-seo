import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { OpenGraph, TwitterCard, SchemaOrg } from '@pittica/gatsby-plugin-seo';

const Seo = ({ postData, frontmatter, image, isBlogPost, title, path, description, keywords, author, locale }) => {
  const { site: { siteMetadata }, siteBuildMetadata } = useStaticQuery(
    graphql`
      query {
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
        siteBuildMetadata {
          fields {
            seo {
              image
            }
          }
        }
      }
    `
  );

  const siteUrl = siteMetadata.siteUrl.replace(/\/$/, '');
  const postMeta = frontmatter || postData.frontmatter || {};
  const postTitle = title ? title : postMeta.title ? postMeta.title : siteMetadata.title;
  const postDescription = description || postMeta.description || siteMetadata.description;
  const postImage = image
    ? `${siteUrl}/${image.replace(/^\//, '')}`
    : `${siteUrl}/${siteBuildMetadata.fields.seo.image.replace(/^\//, '')}`;
  const url = path ? new URL(path, siteUrl).href : siteUrl;
  const datePublished = isBlogPost ? postMeta.datePublished : false;
  const postLocale = locale ? locale : siteMetadata.locale;

  return (
    <Fragment>
      <Helmet
        htmlAttributes={{
          lang: postLocale.language
        }}
        title={postTitle}
        titleTemplate={title ? `%s | ${siteMetadata.title}` : siteMetadata.title}
      >
        <meta name="description" content={postDescription} />
        {keywords && keywords.length > 0 && <meta name="keywords" content={keywords.join(', ')} />}
        <meta name="image" content={postImage} />
        <link rel="canonical" href={url} />
      </Helmet>
      <OpenGraph
        url={url}
        article={isBlogPost}
        title={postTitle}
        description={postDescription}
        image={postImage}
        locale={postLocale}
      />
      <TwitterCard title={postTitle} description={postDescription} image={postImage} />
      <SchemaOrg
        isBlogPost={isBlogPost}
        url={url}
        title={postTitle}
        image={postImage}
        description={postDescription}
        datePublished={datePublished}
        siteUrl={siteMetadata.siteUrl}
        author={author || siteMetadata.author}
        organization={siteMetadata.organization}
        defaultTitle={siteMetadata.title}
      />
    </Fragment>
  );
};

Seo.propTypes = {
  isBlogPost: PropTypes.bool,
  postData: PropTypes.shape({
    childMarkdownRemark: PropTypes.shape({
      frontmatter: PropTypes.any,
      excerpt: PropTypes.any
    })
  }),
  image: PropTypes.string,
  title: PropTypes.string,
  locale: PropTypes.any
};

Seo.defaultProps = {
  isBlogPost: false,
  postData: { childMarkdownRemark: {} },
  image: null,
  title: null
};

export default Seo;
