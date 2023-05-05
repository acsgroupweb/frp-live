import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import Img from "gatsby-image"

export default function Jobs() {
  const data = useStaticQuery(graphql`
    {
      jobs: allMarkdownRemark(
        filter: { frontmatter: { layout: { eq: "jobs" } } }
        sort: { fields: [frontmatter___sortOrder], order: ASC }
      ) {
        edges {
          node {
            fields {
              slug
            }
            htmlAst
            frontmatter {
              title
              featuredImage {
                childImageSharp {
                  fluid(maxWidth: 600, quality: 100) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
            }
          }
        }
      }
    }
  `)
  const jobsMarkUp = data.jobs.edges.map((job, index) => {
    return (
      <Link to={job.node.fields.slug} className="card__link">
        <div className="card card--job" key={job.node.id}>
          <h1 className="card__title">{job.node.frontmatter.title}</h1>
          <Img
            fluid={job.node.frontmatter.featuredImage.childImageSharp.fluid}
            alt={"Job-Image- " + index}
          />

          <span
            className="card__blurb"
            dangerouslySetInnerHTML={{
              __html: job.node.htmlAst.children.filter(item => {
                return item.tagName === "p"
              })[0].children[0].value,
            }}
          />

          <span className="red-outline-button red-outline-button--card">
            Apply
          </span>
        </div>
      </Link>
    )
  })

  return <>{jobsMarkUp}</>
}
