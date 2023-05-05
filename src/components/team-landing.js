import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import { Link } from "gatsby"

const TeamLanding = props => {
  const data = useStaticQuery(graphql`
    {
      allMarkdownRemark(
        filter: { frontmatter: { layout: { eq: "team" } } }
        sort: { fields: [frontmatter___order, frontmatter___name], order: ASC }
      ) {
        edges {
          node {
            id
            frontmatter {
              name
              jobTitle
              credentials
              showDetailedPage
              profilePicture {
                childImageSharp {
                  # Specify a fixed image and fragment.
                  # The default width is 400 pixels
                  fluid(maxWidth: 400, maxHeight: 300, quality: 100) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
            }
            html
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  const teamMembers = data.allMarkdownRemark.edges

  const teamMembersMarkUp = teamMembers.map((currentItem, index) => {
    var markUp

    markUp = (
      <Link to={currentItem.node.fields.slug} key={index}>
        <div className="team-member" key={"team-member-" + index}>
          <div className="team-member-image">
            <Img
              fluid={
                currentItem.node.frontmatter.profilePicture.childImageSharp
                  .fluid
              }
              alt={"Team-Member-Image- " + index}
            />
          </div>
          <div className="team-member-info">
            <div className="team-member-name">
              {currentItem.node.frontmatter.name}
              {currentItem.node.frontmatter.credentials &&
                ", " + currentItem.node.frontmatter.credentials}
            </div>
            <div className="team-member-jobTitle">
              {currentItem.node.frontmatter.jobTitle}
            </div>
          </div>
        </div>
      </Link>
    )

    return markUp
  })

  return (
    <div className="team-landing-wrapper">
      <div className="section-title">
        <span className="top-text">
          Tea<span className="half-color">m</span>
        </span>
        <span className="horizontal-line"></span>
      </div>
      <div className="team-gallery">{teamMembersMarkUp}</div>
    </div>
  )
}

export default TeamLanding
