import React, { Fragment } from "react"
import { Helmet } from "react-helmet"
import PropTypes from "prop-types"

import OpenGraph from "./open-graph"
import TwitterCard from "./twitter-card"
import SchemaOrg from "./schema-org"

import useOptions from "../utils/useOptions"
import withUrl from "../utils/withUrl"

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
  const { site, defaultImage } = useOptions()

  const postMeta = frontmatter || postData.frontmatter || {}
  const postTitle = title ? title : postMeta.title ? postMeta.title : site.title
  const postDescription =
    description || postMeta.description || site.description
  const postImage = image ? withUrl(image, site.siteUrl) : defaultImage
  const url = withUrl(path, site.siteUrl)
  const datePublished = isBlogPost ? postMeta.datePublished : false
  const postLocale = locale ? locale : site.locale

  return (
    <Fragment>
      <Helmet
        htmlAttributes={{
          lang: postLocale.language,
        }}
        title={postTitle}
        titleTemplate={title ? `%s | ${site.title}` : site.title}
      >
        <meta name="description" content={postDescription} />
        {keywords && keywords.length > 0 && (
          <meta name="keywords" content={keywords.join(", ")} />
        )}
        <meta name="image" content={postImage} />
        <link rel="canonical" href={url} />
        {next && <link rel="next" href={withUrl(next, site.siteUrl)} />}
        {previous && <link rel="prev" href={withUrl(previous, site.siteUrl)} />}
      </Helmet>
      <OpenGraph
        url={url}
        article={isBlogPost}
        title={postTitle}
        description={postDescription}
        image={postImage}
        locale={postLocale}
      />
      <TwitterCard
        title={postTitle}
        description={postDescription}
        image={postImage}
      />
      <SchemaOrg
        isBlogPost={isBlogPost}
        url={url}
        title={postTitle}
        image={postImage}
        description={postDescription}
        datePublished={datePublished}
        siteUrl={site.siteUrl}
        author={author || site.author}
        organization={site.organization}
        defaultTitle={site.title}
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
