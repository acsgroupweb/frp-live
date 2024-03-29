import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import { Link } from "gatsby"
import Img from "gatsby-image"

export default function BlogPost({ location, data }) {
  var pathName = "/news"
  //console.log(location)

  if (
    location.state !== null &&
    location.state !== undefined &&
    location.state.pathName !== undefined
  ) {
    const { state = {} } = location

    pathName = state.pathName
  }
  const post = data.markdownRemark
  return (
    <Layout>
      <div className="news-single-container" style={{paddingBottom:'20vh'}}>
        <div className="news-single-image">
          <Img
            fluid={post.frontmatter.newsItemImage.childImageSharp.fluid}
            alt={"Featured Image for- " + post.frontmatter.title}
          />
        </div>
        <div className="news-single-info">
          <div className="navigation">
            <Link
              to={pathName}
              className="back-button"
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
          <div className="single-page-title">{post.frontmatter.title}</div>
          <div className="news-meta-data">
            <small>Posted on {post.frontmatter.date}</small>
            <small>
              Category:{" "}
              <Link
                className="category-link"
                to={`/news/category/${post.frontmatter.category}`}
              >
                {post.frontmatter.category}
              </Link>
            </small>
          </div>
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
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
        date(formatString: "DD MMMM YYYY")
        category
        newsItemImage {
          childImageSharp {
            # Specify a fixed image and fragment.
            # The default width is 400 pixels
            fluid(maxWidth: 800, quality: 100) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
  }
`
