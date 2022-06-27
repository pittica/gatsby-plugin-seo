import { searchArray } from "@pittica/gatsby-plugin-utils"

export default function extract(data, { title, description, image, fields }) {
  if (fields) {
    return {
      title: searchArray(fields.title, data, title),
      description: searchArray(fields.description, data, description),
      image:
        searchArray(fields.image, data, image) ||
        searchArray(fields.imageFallback, data, image),
    }
  } else {
    return {
      title,
      description,
      image,
    }
  }
}
