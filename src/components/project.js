import React, { useState } from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import Img from "gatsby-image"

import ProjectModal from "../components/project-modal"

function ToggleButton(props) {
  return (
    <button
      aria-expanded={props.expanded}
      aria-controls="menu-list"
      onClick={props.onClick}
      className="category-menu-button"
    >
      <div className="bar1"></div>
      <div className="bar2"></div>
      <div className="bar3"></div>
    </button>
  )
}

const Project = () => {
  const data = useStaticQuery(graphql`
    {
      allMarkdownRemark(
        filter: { frontmatter: { layout: { eq: "project" } } }
      ) {
        edges {
          node {
            id
            frontmatter {
              title
              subTitle
              location
              category
              featuredMobileProject
              featuredDesktopProject
              smallImage: featuredImage {
                childImageSharp {
                  # Specify a fixed image and fragment.
                  # The default width is 400 pixels
                  fluid(maxWidth: 200, maxHeight: 100, quality: 50) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
              largeImage: featuredImage {
                childImageSharp {
                  # Specify a fixed image and fragment.
                  # The default width is 400 pixels
                  fluid(maxWidth: 400, maxHeight: 200, quality: 50) {
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
            html
          }
        }
      }
      categoryNames: allMarkdownRemark(
        filter: { frontmatter: { layout: { eq: "projectcategory" } } }
        sort: { fields: frontmatter___sortOrder, order: ASC }
        skip: 1
      ) {
        edges {
          node {
            frontmatter {
              category
            }
          }
        }
      }
    }
  `)

  const projectItems = data.allMarkdownRemark.edges
  const categoryItems = data.categoryNames.edges
  const [mMenuExpanded, setmMenuExpanded] = useState(false)
  const [projectClickIndex, setProjectClickIndex] = useState(-1)
  const [category, setCategory] = useState("All")
  let projectItemsFiltered = projectItems // default

  const categoryItemsMarkUp = categoryItems.map((currentMenuItem, index) => {
    return (
      <div
        className={
          currentMenuItem.node.frontmatter.category === category
            ? "category-item selected"
            : "category-item"
        }
        key={"pli" + index}
      >
        <span
          key={"cb-" + index}
          onClick={() => {
            setCategory(currentMenuItem.node.frontmatter.category)
            setmMenuExpanded(!mMenuExpanded)
          }}
          role="button"
          aria-label={"Category Button" + (index + 1)}
          tabIndex={index}
          onKeyDown={() => {
            setCategory(currentMenuItem.node.frontmatter.category)
            setmMenuExpanded(!mMenuExpanded)
          }}
        >
          {currentMenuItem.node.frontmatter.category}
        </span>
      </div>
    )
  })

  // Apply featuredMobileProject and featuredDesktopProject only for
  // "All" category
  if (category === "All") {
    if (typeof window !== "undefined" && window.innerWidth < 1000) {
      projectItemsFiltered = projectItems.filter((currentItem, index) => {
        return currentItem.node.frontmatter.featuredMobileProject
      })
    } else {
      projectItemsFiltered = projectItems.filter((currentItem, index) => {
        return currentItem.node.frontmatter.featuredDesktopProject
      })
    }
  }

  // console.log(projectItemsFiltered)

  projectItemsFiltered.sort((a, b) => {
    if (a.node.frontmatter.title > b.node.frontmatter.title) {
      return 1
    }
    if (a.node.frontmatter.title < b.node.frontmatter.title) {
      return -1
    }
    return 0
  })

  const projectItemsMarkUp = projectItemsFiltered.map((currentItem, index) => {
    const sources = [
      currentItem.node.frontmatter.smallImage.childImageSharp.fluid,
      {
        ...currentItem.node.frontmatter.largeImage.childImageSharp.fluid,
        media: `(min-width: 500px)`,
      },
    ]
    let markUp
    if (
      currentItem.node.frontmatter.category === category ||
      category === "All"
    ) {
      markUp = (
        <div className="project-item" key={"project-" + index}>
          <span
            className="project-modal-link"
            key={"pi-" + index}
            onClick={() => {
              setProjectClickIndex(index)
            }}
            role="button"
            aria-label={"Project Link" + (index + 1)}
            tabIndex={index}
            onKeyDown={() => {
              setProjectClickIndex(index)
            }}
          >
            <Img
              fluid={sources}
              alt={"Project-Image- " + index}
              loading="lazy"
            />
            <div className="project-name">
              {currentItem.node.frontmatter.title}
            </div>
          </span>
          <div
            className={
              index === projectClickIndex
                ? "project-modal show"
                : "project-modal"
            }
          >
            {
              <ProjectModal
                index={index}
                projectItem={currentItem}
                onProjectClick={() => {
                  setProjectClickIndex(-1)
                }}
                isActive={index === projectClickIndex}
              />
            }
          </div>
          <span
            className="project-item-overlay"
            key={"pio-" + index}
            onClick={() => {
              setProjectClickIndex(index)
            }}
            role="button"
            aria-label={"Project Link" + (index + 1)}
            tabIndex={index}
            onKeyDown={() => {
              setProjectClickIndex(index)
            }}
          >
            <div className="project-title">
              {currentItem.node.frontmatter.title}
            </div>
          </span>
        </div>
      )
    }
    return markUp
  })

  return (
    <div className="project-wrapper">
      <div className="section-title">
        <span className="top-text">Featured</span>
        <span className="horizontal-line"></span>
        <span className="bottom-text">
          Pr<span className="half-color">o</span>jects
        </span>
      </div>
      <div className="project-categories">
        <div className="section-sub-title">
          <span>Categories</span>
          <ToggleButton
            expanded={mMenuExpanded}
            onClick={() => {
              setmMenuExpanded(!mMenuExpanded)
            }}
          />
          <div
            className={
              category === "All"
                ? "category-item selected all"
                : "category-item all"
            }
          >
            <span
              key={"cb-All"}
              onClick={() => {
                setCategory("All")
              }}
              role="button"
              aria-label={"Category Button All"}
              tabIndex={0}
              onKeyDown={() => {
                setCategory("All")
              }}
            >
              All
            </span>
          </div>
        </div>

        <Link
          to="/projects"
          className="red-outline-button"
          state={{ projectCategory: category !== null ? category : "All" }}
        >
          More
        </Link>
      </div>
      <div className="section-sub-title center">
        <span>
          {category === "All"
            ? "Featured Projects from All Categories"
            : `${category} Projects`}
        </span>
      </div>
      <div
        className={mMenuExpanded ? "category-items toggle" : "category-items"}
      >
        {categoryItemsMarkUp}
      </div>
      <div className="project-gallery">{projectItemsMarkUp}</div>
    </div>
  )
}

export default Project
