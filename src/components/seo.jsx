import React, { Fragment, useContext } from "react"
import { Helmet } from "react-helmet-async"
import PropTypes from "prop-types"
import { withUrl } from "@pittica/gatsby-plugin-utils"

import SocialContext from "../context/social-context"
import OpenGraph from "./open-graph"
import TwitterCard from "./twitter-card"
import Webpage from "./ld-json/webpage"
import Breadcrumb from "./ld-json/breadcrumb"
import Links from "./links"
import PageMeta from "./page-meta"

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
        {keywords && keywords.length > 0 && (
          <meta
            name="keywords"
            content={keywords.join(", ")}
            key="html-keywords"
          />
        )}
      </Helmet>
      <PageMeta siteUrl={siteUrl} description={postDescription} image={image} />
      <Links siteUrl={siteUrl} path={path} next={next} previous={previous} />
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
  image: null,
  title: null,
  breadcrumb: [],
}
