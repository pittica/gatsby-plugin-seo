exports.pluginOptionsSchema = ({ Joi }) => {
  return Joi.object({
    socials: Joi.object({
      instagram: Joi.object({
        username: Joi.string()
          .required()
          .description(`Instagram username.`)
          .default(""),
        icon: Joi.string()
          .description(`Instagram icon class.`)
          .default("instagram"),
        show: Joi.boolean()
          .description(
            `A value indicating whether the social network has to been displayed on social follow.`
          )
          .default(true),
      }).default({ username: "", icon: "instagram", show: false }),
      github: Joi.object({
        username: Joi.string()
          .required()
          .description(`GitHub username.`)
          .default(""),
        icon: Joi.string().description(`GitHub icon class.`).default("github"),
        show: Joi.boolean()
          .description(
            `A value indicating whether the social network has to been displayed on social follow.`
          )
          .default(true),
      }).default({ username: "", icon: "github", show: false }),
      facebook: Joi.object({
        page: Joi.string()
          .required()
          .description(`Facebook page username.`)
          .default(""),
        app: Joi.string().description(`Facebook app ID.`).default(""),
        icon: Joi.string()
          .description(`Facebook icon class.`)
          .default("facebook"),
        show: Joi.boolean()
          .description(
            `A value indicating whether the social network has to been displayed on social follow.`
          )
          .default(true),
      }).default({ page: "", app: "", icon: "facebook", show: false }),
      linkedin: Joi.object({
        page: Joi.string()
          .required()
          .description(`LinkedIn page username.`)
          .default(""),
        icon: Joi.string()
          .description(`LinkedIn icon class.`)
          .default("linkedin"),
        show: Joi.boolean()
          .description(
            `A value indicating whether the social network has to been displayed on social follow.`
          )
          .default(true),
      }).default({ page: "", icon: "linkedin", show: false }),
      twitter: Joi.object({
        username: Joi.string()
          .required()
          .description(`Twitter username.`)
          .default(""),
        site: Joi.string().description(`Twitter site tag.`).default(""),
        icon: Joi.string()
          .description(`Twitter icon class.`)
          .default("twitter"),
        show: Joi.boolean()
          .description(
            `A value indicating whether the social network has to been displayed on social follow.`
          )
          .default(true),
      }).default({ username: "", site: "", icon: "twitter", show: false }),
      youtube: Joi.object({
        username: Joi.string()
          .required()
          .description(`YouTube username.`)
          .default(""),
        icon: Joi.string()
          .description(`YouTube icon class.`)
          .default("youtube"),
        show: Joi.boolean()
          .description(
            `A value indicating whether the social network has to been displayed on social follow.`
          )
          .default(true),
      }).default({ username: "", icon: "youtube", show: false }),
    }).default({
      instagram: { username: "", icon: "instagram", show: false },
      github: { username: "", icon: "github", show: false },
      facebook: { page: "", app: "", icon: "facebook", show: false },
      linkedin: { page: "", icon: "linkedin", show: false },
      twitter: { username: "", site: "", icon: "twitter", show: false },
      youtube: { username: "", icon: "youtube", show: false },
    }),
    image: Joi.string().description(`Default image to share.`).default(""),
  })
}
