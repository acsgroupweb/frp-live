import React from "react"
import { useStaticQuery, graphql } from "gatsby"
const Introduction = () => {
  const data = useStaticQuery(graphql`
    {
      slider: allMarkdownRemark(
        filter: { frontmatter: { layout: { eq: "home-slider" } } }
      ) {
        edges {
          node {
            html
          }
        }
      }
    }
  `)
  return (
    <div
      className="mobile-introductory-text"
      dangerouslySetInnerHTML={{ __html: data.slider.edges[0].node.html }}
    />
  )
}

export default Introduction
