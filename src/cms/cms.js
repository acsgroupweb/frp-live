import CMS from "netlify-cms-app"
import slugify from "slugify"

const slugifyTeamName = async (values) => {
  if (values.name) {
    const slug = slugify(values.name, { lower: true, strict: true, locale: "en" }).replace(/[^a-zA-Z0-9-]/g, '')
    values.slug = `team/${slug}`
  }
  return values
}

CMS.init({
  config: {
    backend: {
      name: "git-gateway",
    },
    media_folder: "static/uploads",
    public_folder: "/uploads",
    collections: [/* Your collections */],
  },
  // Add this part
  options: {
    load_config_file: false,
  },
  // Add this part
  async onInit() {
    CMS.registerEventListener({
      name: "preSave",
      handler: async ({ entry }) => {
        if (entry.get("collection") === "team") {
          const values = entry.get("data").toJS()
          const newValues = await slugifyTeamName(values)
          entry.get("data").merge(newValues)
        }
      },
    })
  },
})
