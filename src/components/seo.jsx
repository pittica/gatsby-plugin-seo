import React, { Fragment, useContext } from "react"
import { Helmet } from "react-helmet-async"
import PropTypes from "prop-types"
import { withUrl } from "@pittica/gatsby-plugin-utils"

import SocialContext from "../context/social-context"
import OpenGraph from "./open-graph"
import TwitterCard from "./twitter-card"
import Webpage from "./ld-json/webpage"
import Breadcrumb from "./ld-json/breadcrumb"

export default function Seo({
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
  breadcrumb,
  datePublished,
}) {
  const context = useContext(SocialContext)

  const postTitle = title || context.title
  const postDescription = description || context.description
  const url = withUrl(path, context.siteUrl)
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
          <meta
            name="description"
            content={postDescription}
            key="html-description"
          />
        )}
        {keywords && keywords.length > 0 && (
          <meta
            name="keywords"
            content={keywords.join(", ")}
            key="html-keywords"
          />
        )}
        {image && (
          <meta
            name="image"
            content={withUrl(image, context.siteUrl)}
            key="html-image"
          />
        )}
        <link rel="canonical" href={url} key="html-canonical" />
        {next && (
          <link
            rel="next"
            href={withUrl(next, context.siteUrl)}
            key="html-next"
          />
        )}
        {previous && (
          <link
            rel="prev"
            href={withUrl(previous, context.siteUrl)}
            key="html-previous"
          />
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
      <Webpage
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
      <Breadcrumb
        url={url}
        title={postTitle}
        image={image}
        items={breadcrumb}
      />
    </Fragment>
  )
}

Seo.propTypes = {
  title: PropTypes.string,
  image: PropTypes.string,
  path: PropTypes.string,
  description: PropTypes.string,
  keywords: PropTypes.arrayOf(PropTypes.string),
  author: PropTypes.string,
  isBlogPost: PropTypes.bool,
  locale: PropTypes.any,
  next: PropTypes.string,
  previous: PropTypes.string,
  breadcrumb: PropTypes.array,
  datePublished: PropTypes.string,
}

Seo.defaultProps = {
  isBlogPost: false,
  postData: { childMarkdownRemark: {} },
  image: null,
  title: null,
  breadcrumb: [],
}
