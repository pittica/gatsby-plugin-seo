import React, { Fragment, useContext } from "react"
import { Helmet } from "react-helmet-async"
import PropTypes from "prop-types"
import { withUrl } from "@pittica/gatsby-plugin-utils"

import OpenGraph from "./open-graph"
import TwitterCard from "./twitter-card"
import SchemaOrg from "./ld-json/schema-org"

import SocialContext from "../context/social-context"

export default function Seo({
  postData,
  frontmatter,
  image,
  isBlogPost,
  title,
  path,
  description,
  keywords,
  author,
  locale,
  next,
  previous,
}) {
  const context = useContext(SocialContext)

  const postMeta = frontmatter || postData.frontmatter || {}
  const postTitle = title
    ? title
    : postMeta.title
    ? postMeta.title
    : context.title
  const postDescription = description || postMeta.description
  const url = withUrl(path, context.siteUrl)
  const datePublished = isBlogPost ? postMeta.datePublished : false
  const postLocale = locale ? locale : context.locale

  return (
    <Fragment>
      <Helmet
        htmlAttributes={{
          lang: postLocale?.language,
        }}
        title={postTitle}
        titleTemplate={title ? `%s | ${context.title}` : context.title}
      >
        {postDescription && (
          <meta name="description" content={postDescription} />
        )}
        {keywords && keywords.length > 0 && (
          <meta name="keywords" content={keywords.join(", ")} />
        )}
        {image && (
          <meta name="image" content={withUrl(image, context.siteUrl)} />
        )}
        <link rel="canonical" href={url} />
        {next && <link rel="next" href={withUrl(next, context.siteUrl)} />}
        {previous && (
          <link rel="prev" href={withUrl(previous, context.siteUrl)} />
        )}
      </Helmet>
      <OpenGraph
        url={url}
        article={isBlogPost}
        title={postTitle}
        description={postDescription}
        image={image}
        locale={postLocale}
      />
      <TwitterCard
        title={postTitle}
        description={postDescription}
        image={image}
      />
      <SchemaOrg
        isBlogPost={isBlogPost}
        url={url}
        title={postTitle}
        image={image}
        description={postDescription}
        datePublished={datePublished}
        siteUrl={context.siteUrl}
        author={author || context.author}
        organization={context.organization}
        defaultTitle={context.title}
      />
    </Fragment>
  )
}

Seo.propTypes = {
  isBlogPost: PropTypes.bool,
  postData: PropTypes.shape({
    childMarkdownRemark: PropTypes.shape({
      frontmatter: PropTypes.any,
      excerpt: PropTypes.any,
    }),
  }),
  image: PropTypes.string,
  title: PropTypes.string,
  locale: PropTypes.any,
  next: PropTypes.string,
  previous: PropTypes.string,
}

Seo.defaultProps = {
  isBlogPost: false,
  postData: { childMarkdownRemark: {} },
  image: null,
  title: null,
}
