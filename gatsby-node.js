const loadsh = require(`lodash`)

exports.onCreateNode = ({ node, actions }, options) => {
  const { createNodeField } = actions

  if (node.id === `SiteBuildMetadata`) {
    const socials = loadsh.merge({
      instagram: {
        username: ``
      },
      github: {
        username: ``
      },
      facebook: {
        page: ``,
        app: ``
      },
      twitter: {
        username: ``,
        site: ``
      }
    }, options.socials || {})

    createNodeField({
      name: `seo`,
      node,
      value: {
        image: options.image,
        socials
      }
    })
  }
}
