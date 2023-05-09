import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"
import { Link } from "gatsby"

export default function TeamSingle({ data }) {
  const teamMember = data.markdownRemark

  return (
    <Layout>
      <div className="team-single-wrapper">
        <div className="team-single-image">
          <Img
            fluid={teamMember.frontmatter.profilePicture.childImageSharp.fluid}
            alt={"Team-Member-Image- " + teamMember.frontmatter.name}
          />
        </div>
        <div className="team-single-info">
          <div className="navigation">
            <Link
              to="/team"
              onClick={e => {
                if (window.history.state !== null) {
                  window.history.back()
                } else {
                  e.preventDefault()
                }
              }}
              className="back-button mobile"
            >
              Back
            </Link>
          </div>
          <div className="single-page-title">
            {teamMember.frontmatter.name}
            {teamMember.frontmatter.credentials &&
              ", " + teamMember.frontmatter.credentials}
          </div>

          <div className="single-page-subTitle">
            {teamMember.frontmatter.jobTitle}
          </div>

          <div
            className="single-page-content"
            dangerouslySetInnerHTML={{ __html: teamMember.html }}
          />
          <div className="navigation">
            <Link
              to="/team"
              className="back-button desktop"
              onClick={e => {
                if (window.history.state !== null) {
                  window.history.back()
                } else {
                  e.preventDefault()
                }
              }}
            >
              Back
            </Link>
          </div>
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
        name
        credentials
        jobTitle
        profilePicture {
          childImageSharp {
            gatsbyImageData(placeholder: BLURRED, layout: CONSTRAINED)
          }
        }
      }
    }
  }
`
