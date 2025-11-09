const escapeStringRegexp = require("escape-string-regexp")

const pagePath = `static/content/about`
const indexName = `About`

const teamQuery = `{
  team: allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/static/content/team/"}}) {
    edges {
      node {
        id
        frontmatter {
          title: name
          order
        }
        fields {
          slug
        }
        htmlAst
      }
    }
  }
}`

const projectsQuery = `{
  projects: allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/static/content/projects/"}}) {
    edges {
      node {
        id
        frontmatter {
          title
          location
          category
          categorySortNumber
        }
        fields {
          slug
        }
      }
    }
  }
}`

const newsQuery = `{
  news: allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/static/content/news/"}}) {
    edges {
      node {
        id
        frontmatter {
          title
          date
        }
        fields {
          slug
        }
        htmlAst
      }
    }
  }
}`

function pageToAlgoliaRecord({ node: { id, frontmatter, fields, ...rest } }) {
  return {
    objectID: id,
    ...frontmatter,
    ...fields,
    ...rest,
  }
}

const queries = [
  {
    query: teamQuery,
    transformer: ({ data }) => {
      return data.team.edges.reduce(
        (indices, { node: { id, frontmatter, fields, htmlAst, ...rest } }) => {
          const pChunks = htmlAst.children.filter(tag => {
            return tag.tagName === "p"
          })
          const chunks = pChunks.map((pchnk, index) => ({
            objectID: id + index,
            excerpt: pchnk.children[0].value,
            ...frontmatter,
            ...fields,
            ...rest,
          }))
          return [...indices, ...chunks]
        },
        []
      )
    },
    indexName: `Team`,
  },
  {
    query: projectsQuery,
    transformer: ({ data }) => data.projects.edges.map(pageToAlgoliaRecord),
    indexName: `Projects`,
  },
  {
    query: newsQuery,
    transformer: ({ data }) => {
      return data.news.edges.reduce(
        (indices, { node: { id, frontmatter, fields, htmlAst, ...rest } }) => {
          const pChunks = htmlAst.children.filter(tag => {
            return tag.tagName === "p"
          })
          const chunks = pChunks.map((pchnk, index) => ({
            objectID: id + index,
            excerpt: pchnk.children[0].value,
            ...frontmatter,
            ...fields,
            ...rest,
          }))
          //console.log(chunks)
          return [...indices, ...chunks]
        },
        []
      )
    },
    indexName: `News`,
  },
]
module.exports = queries
