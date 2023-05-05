const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      allOtherItems: allMarkdownRemark(
        filter: { frontmatter: { layout: { in: ["project", "team"] } } }
      ) {
        edges {
          node {
            frontmatter {
              layout
            }
            fields {
              slug
            }
          }
        }
      }

      jobItems: allMarkdownRemark(
        filter: { frontmatter: { layout: { eq: "jobs" } } }
      ) {
        edges {
          node {
            frontmatter {
              layout
            }
            fields {
              slug
            }
          }
        }
      }

      newsItems: allMarkdownRemark(
        filter: { frontmatter: { layout: { eq: "news" } } }
      ) {
        edges {
          node {
            frontmatter {
              layout
            }
            fields {
              slug
            }
          }
        }
      }

      newsCategories: allMarkdownRemark(
        limit: 2000
        filter: { frontmatter: { layout: { eq: "news" } } }
      ) {
        group(field: frontmatter___category) {
          fieldValue
          totalCount
          nodes {
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  result.data.allOtherItems.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(
        `./src/templates/${node.frontmatter.layout}-single.js`
      ),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        slug: node.fields.slug,
      },
    })
  })

  result.data.jobItems.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(
        `./src/templates/${node.frontmatter.layout}-single.js`
      ),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        slug: node.fields.slug,
      },
    })
  })

  result.data.newsItems.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(
        `./src/templates/${node.frontmatter.layout}-single.js`
      ),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        slug: node.fields.slug,
      },
    })
  })

  // Extract category from query
  const categories = result.data.newsCategories.group
  //Make category pages
  categories.forEach(category => {
    const categoryPosts = category.nodes
    const categoryPostsPerPage = 6
    const numCategoryPages = Math.ceil(
      categoryPosts.length / categoryPostsPerPage
    )
    Array.from({ length: numCategoryPages }).forEach((_, i) => {
      createPage({
        path:
          i === 0
            ? `/news/category/${category.fieldValue}`
            : `/news/category/${category.fieldValue}/${i + 1}`,
        component: path.resolve("./src/templates/news-category-archive.js"),
        context: {
          limit: categoryPostsPerPage,
          skip: i * categoryPostsPerPage,
          numCategoryPages,
          currentPage: i + 1,
          category: category.fieldValue,
        },
      })
    })
    // createPage({
    //   path: `/news/category/${category.fieldValue}/`,
    //   component: path.resolve(`./src/templates/news-category-archive.js`),
    //   context: {
    //     category: category.fieldValue,
    //   },
    // })
  })

  const posts = result.data.newsItems.edges
  const postsPerPage = 6
  const numPages = Math.ceil(posts.length / postsPerPage)
  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/news` : `/news/${i + 1}`,
      component: path.resolve("./src/templates/news-list.js"),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    })
  })
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
    }
    type Frontmatter {
      subTitle: String
      sliderImages: [MarkdownRemarkFrontmatterSliderImages]
    }

    type MarkdownRemarkFrontmatterSliderImages {
      
      credit: String
    }
  `
  createTypes(typeDefs)
}
