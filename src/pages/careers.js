import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql } from "gatsby"
import Jobs from "../components/jobs"
import Slider from "../components/slider1"

export default function Careers({ data }) {
  const careersData = data.careers.edges[0].node

  return (
    <Layout>
      <SEO title="Careers" />
      <div className="careers-page-container">
        <div className="section-title">
          <span>
            Car<span className="half-color">e</span>ers
          </span>
        </div>
        <Slider
          images={careersData.frontmatter.sliderImages}
          displayArrowButtons={false}
          displayCreditBelowImage={false}
          autoScroll={true}
        />
        <div
          className="single-page-content"
          dangerouslySetInnerHTML={{
            __html: careersData.html,
          }}
        />
        <div className="careers__jobs">
          <Jobs />
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  {
    careers: allMarkdownRemark(
      filter: {frontmatter: {layout: {eq: "careers"}}}
      sort: {frontmatter: {sortOrder: ASC}}
    ) {
      edges {
        node {
          id
          html
          frontmatter {
            sliderImages {
              image {
                childImageSharp {
                  fluid(maxWidth: 1000, quality: 100) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`
