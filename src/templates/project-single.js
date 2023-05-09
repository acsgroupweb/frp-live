import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Slider from "../components/slider1"
import { Link } from "gatsby"

export default function ProjectSingle({ location, data }) {
  var projectCategory = "All"
  var anchor = ""
  if (
    location.state !== null &&
    location.state !== undefined &&
    location.state.projectCategory !== undefined &&
    location.state.anchor !== undefined
  ) {
    const { state = {} } = location
    projectCategory = state.projectCategory
    anchor = state.anchor
  }

  const post = data.markdownRemark
  return (
    <Layout>
      <div className="projects-single">
        <div className="projects-single-slider">
          <Slider
            images={post.frontmatter.sliderImages}
            displayArrowButtons={true}
          />
        </div>
        <div className="projects-single-content">
          <div className="navigation">
            <Link
              to={`/projects#${anchor}`}
              className="back-button"
              state={{
                projectCategory: projectCategory,
              }}
            >
              Back
            </Link>
          </div>
          <div className="single-page-title">{post.frontmatter.title}</div>
          <div className="single-page-subTitle">
            {post.frontmatter.location}
          </div>

          <div
            className="single-page-content"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        subTitle
        location
        sliderImages {
          image {
            childImageSharp {
              # Specify a fixed image and fragment.
              # The default width is 400 pixels
              fluid(maxWidth: 1000, quality: 100) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
          credit
        }
      }
    }
  }
`
