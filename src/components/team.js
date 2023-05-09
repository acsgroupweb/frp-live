import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import { Link } from "gatsby"

const Team = () => {
  const data = useStaticQuery(graphql`
    {
      allMarkdownRemark(
        filter: { frontmatter: { layout: { eq: "home-team" } } }
      ) {
        edges {
          node {
            id
            frontmatter {
              smallImage: profilePicture {
                childImageSharp {
                  gatsbyImageData(placeholder: BLURRED, layout: CONSTRAINED)
                }
              }
              largeImage: profilePicture {
                childImageSharp {
                  gatsbyImageData(placeholder: BLURRED, layout: CONSTRAINED)
                }
              }
            }
            html
          }
        }
      }
      allFile(filter: { name: { in: ["frpinc-logo-notext"] } }) {
        edges {
          node {
            childImageSharp {
              gatsbyImageData(layout: FULL_WIDTH)
            }
          }
        }
      }
    }
  `)

  const sources = [
    data.allMarkdownRemark.edges[0].node.frontmatter.smallImage.childImageSharp
      .fluid,
    {
      ...data.allMarkdownRemark.edges[0].node.frontmatter.largeImage
        .childImageSharp.fluid,
      media: `(min-width: 500px)`,
    },
  ]
  return (
    <div className="team-container">
      <Img
        fluid={sources}
        alt={"Background Image"}
        className="background-image"
        loading="lazy"
      />
      <div className="team-foreground-elements">
        <div className="frp-team-area">
          <Img
            fluid={data.allFile.edges[0].node.childImageSharp.fluid}
            alt="Logo"
            loading="lazy"
          />
          <div className="section-title">
            <span className="horizontal-line"></span>
            <span className="bottom-text">
              Tea<span className="half-color">m</span>
            </span>
          </div>
        </div>
        <div
          className="secondary-text"
          dangerouslySetInnerHTML={{
            __html: data.allMarkdownRemark.edges[0].node.html,
          }}
        />
        <Link to="/team" className="red-outline-button">
          Meet Our Team
        </Link>
      </div>
    </div>
  )
}

export default Team
