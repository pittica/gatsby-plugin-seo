exports.pluginOptionsSchema = ({ Joi }) => {
  return Joi.object({
    socials: Joi.object({
      instagram: Joi.object({
        username: Joi.string().required().description(`Instagram username.`).default('')
      }).default({ username: '' }),
      github: Joi.object({
        username: Joi.string().required().description(`GitHub username.`).default('')
      }).default({ username: '' }),
      facebook: Joi.object({
        page: Joi.string().description(`Facebook page username.`).default(''),
        app: Joi.string().description(`Facebook app ID.`).default('')
      }).default({ page: '', app: '' }),
      linkedin: Joi.object({
        page: Joi.string().description(`LinkdIn page username.`).default('')
      }).default({ page: '' }),
      twitter: Joi.object({
        username: Joi.string().description(`Twitter username.`).default(''),
        site: Joi.string().description(`Twitter site tag.`).default('')
      }).default({ username: '', site: '' })
    }),
    image: Joi.string().description(`Default image to share.`).default('')
  });
};

exports.onCreateNode = ({ node, actions: { createNodeField } }, { socials, image }) => {
  if (node.id === `SiteBuildMetadata`) {
    createNodeField({
      name: `seo`,
      node,
      value: {
        image,
        socials
      }
    });
  }
};
