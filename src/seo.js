import React, { Fragment } from "react"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"
import PropTypes from "prop-types"
import { OpenGraph, TwitterCard, SchemaOrg } from "@pittica/gatsby-plugin-seo"

const SEO = ({ postData, frontmatter, image, isBlogPost, title, path }) => {
  const { site, siteBuildMetadata } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            siteUrl
            locale {
              language
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
  )

  const siteUrl = site.siteMetadata.siteUrl.replace(/\/$/, "")
  const postMeta = frontmatter || postData.frontmatter || {}
  const postTitle = title
    ? title
    : postMeta.title
      ? postMeta.title
      : site.siteMetadata.title
  const description = postMeta.description || site.siteMetadata.description
  const postImage = image
    ? `${siteUrl}/${image.replace(/^\//, "")}`
    : `${siteUrl}/${siteBuildMetadata.fields.seo.image.replace(/^\//, "")}`
  const url = `${siteUrl}${path}`
  const datePublished = isBlogPost ? postMeta.datePublished : false

  return (
    <Fragment>
      <Helmet
        htmlAttributes={{
          lang: site.siteMetadata.locale.language
        }}
        title={postTitle}
        titleTemplate={title ? `%s | ${site.siteMetadata.title}` : site.siteMetadata.title}
      >
        <meta name="description" content={description} />
        <meta name="image" content={postImage} />
        <link rel="canonical" href={url} />
      </Helmet>
      <OpenGraph url={url} article={isBlogPost} title={postTitle} description={description} image={postImage} />
      <TwitterCard title={postTitle} description={description} image={postImage} />
      <SchemaOrg
        isBlogPost={isBlogPost}
        url={url}
        title={postTitle}
        image={postImage}
        description={description}
        datePublished={datePublished}
        siteUrl={site.siteMetadata.siteUrl}
        author={site.siteMetadata.author}
        organization={site.siteMetadata.organization}
        defaultTitle={site.siteMetadata.title}
      />
    </Fragment>
  )
}

SEO.propTypes = {
  isBlogPost: PropTypes.bool,
  postData: PropTypes.shape({
    childMarkdownRemark: PropTypes.shape({
      frontmatter: PropTypes.any,
      excerpt: PropTypes.any
    })
  }),
  image: PropTypes.string,
  title: PropTypes.string
}

SEO.defaultProps = {
  isBlogPost: false,
  postData: { childMarkdownRemark: {} },
  image: null,
  title: null
}

export default SEO