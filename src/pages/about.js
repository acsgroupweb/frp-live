import React, { useState } from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import AboutModal from "../components/about-modal"

const AboutPage = ({ data }) => {
  const aboutData = data.about.nodes

  const [aboutClickIndex, setAboutClickIndex] = useState(-1)
  return (
    <Layout>
      <SEO title="About" />
      <div className="about-page-container">
        <div className="about-wrapper">
          <div className="section-title">
            <span>
              Ab<span className="half-color">o</span>ut
            </span>
            <span className="horizontal-line"></span>
            <span className="bottom-text">FRP</span>
          </div>
          <div
            className="main-text"
            dangerouslySetInnerHTML={{
              __html:
                "<p>" +
                aboutData[0].htmlAst.children.filter(item => {
                  return item.tagName === "p"
                })[0].children[0].value +
                "</p>",
            }}
          />
          <div className="about-timeline-wrapper">
            <div className="about-title">
              <span className="top-text">History</span>
              <span className="horizontal-line"></span>
            </div>
            <div className="timeline-bar"></div>
            <div className="about-timeline">
              {aboutData.slice(1).map((currentItem, index) => {
                return (
                  <div
                    className="item"
                    style={{
                      gridRow: `${index + 1} /span 1`,
                      gridColumn: `${index % 2 === 0 ? `2 / 3` : `1 / 2`}`,
                    }}
                    key={"history-item-" + index}
                  >
                    <span
                      className="project-modal-link"
                      key={"hi-" + index}
                      onClick={() => {
                        setAboutClickIndex(index)
                      }}
                      role="button"
                      aria-label={"Project Link" + (index + 1)}
                      tabIndex={index}
                      onKeyDown={() => {
                        setAboutClickIndex(index)
                      }}
                    >
                      <div
                        className={`header ${
                          index % 2 === 0 ? `left` : `right`
                        }`}
                      >
                        {currentItem.frontmatter.title}
                      </div>
                      <div className="image">
                        <Img
                          fluid={
                            currentItem.frontmatter.featuredImage
                              .childImageSharp.fluid
                          }
                          alt={"History-Image- " + index}
                        />
                      </div>
                      <div
                        className="blurb"
                        dangerouslySetInnerHTML={{
                          __html:
                            "<p>" +
                            currentItem.htmlAst.children.filter(item => {
                              return item.tagName === "p"
                            })[0].children[0].value +
                            "</p>",
                        }}
                      />
                      <div className="timeline-horizontal-bar"></div>
                    </span>
                    <div
                      className={
                        index === aboutClickIndex
                          ? "project-modal show"
                          : "project-modal"
                      }
                    >
                      {
                        <AboutModal
                          index={index}
                          historyItem={currentItem}
                          onAboutClick={() => {
                            setAboutClickIndex(-1)
                          }}
                          isActive={index === aboutClickIndex}
                        />
                      }
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default AboutPage
export const query = graphql`
  {
    about: allMarkdownRemark(
      filter: { frontmatter: { layout: { eq: "about" } } }
      sort: { fields: frontmatter___sortOrder, order: ASC }
    ) {
      nodes {
        frontmatter {
          layout
          title
          featuredImage {
            childImageSharp {
              # Specify a fixed image and fragment.
              # The default width is 400 pixels
              fluid(maxWidth: 500, quality: 100) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
          sliderImages {
            image {
              childImageSharp {
                # Specify a fixed image and fragment.
                # The default width is 400 pixels
                fluid(maxWidth: 800, quality: 60) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
            credit
          }
        }

        htmlAst
      }
    }
  }
`
