import React, { useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import { Link } from "gatsby"

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

const ProjectLanding = props => {
  const data = useStaticQuery(graphql`
    {
      allMarkdownRemark(filter: {frontmatter: {layout: {eq: "project"}}}) {
        edges {
          node {
            id
            frontmatter {
              title
              subTitle
              location
              category
              categorySortNumber
              featuredImage {
                childImageSharp {
                  fluid(maxWidth: 500, maxHeight: 250, quality: 60) {
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
      categoryNames: allMarkdownRemark(
        filter: {frontmatter: {layout: {eq: "projectcategory"}}}
        sort: {frontmatter: {sortOrder: ASC}}
      ) {
        edges {
          node {
            frontmatter {
              category
            }
            html
          }
        }
      }
    }
  `)

  const projectItems = data.allMarkdownRemark.edges
  const categoryItems = data.categoryNames.edges
  const [mMenuExpanded, setmMenuExpanded] = useState(false)
  const [category, setCategory] = useState(props.category)
  var projectItemsFiltered

  function categorySortNumberCompare(a, b) {
    return (
      a.node.frontmatter.categorySortNumber -
      b.node.frontmatter.categorySortNumber
    )
  }

  function titleCompare(a, b) {
    if (
      a.node.frontmatter.title.toLowerCase() >
      b.node.frontmatter.title.toLowerCase()
    ) {
      return 1
    }
    if (
      a.node.frontmatter.title.toLowerCase() <
      b.node.frontmatter.title.toLowerCase()
    ) {
      return -1
    }
    return 0
  }

  const categoryItemsMarkUp = categoryItems
    .slice(1)
    .map((currentMenuItem, index) => {
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

  if (category !== "All") {
    projectItemsFiltered = projectItems.filter((currentItem, index) => {
      return currentItem.node.frontmatter.category === category
    })
    projectItemsFiltered.sort((a, b) => {
      return categorySortNumberCompare(a, b)
    })
  } else {
    projectItemsFiltered = projectItems
    projectItemsFiltered.sort((a, b) => {
      return categorySortNumberCompare(a, b) || titleCompare(a, b)
    })
  }

  const projectItemsMarkUp = projectItemsFiltered.map((currentItem, index) => {
    var markUp
    var anchor = currentItem.node.fields.slug
      .replace("/projects/", "")
      .replace("/", "")
    markUp = (
      <Link
        to={currentItem.node.fields.slug}
        key={index}
        state={{
          projectCategory: category,
          anchor: anchor,
        }}
        id={anchor}
      >
        <div className="project-item" key={"project-" + index}>
          <span
            className="project-modal-link"
            key={"pi-" + index}
            role="button"
            aria-label={"Project Link" + (index + 1)}
            tabIndex={index}
          >
            {currentItem.node.frontmatter.featuredImage && (
              <Img
                fluid={
                  currentItem.node.frontmatter.featuredImage.childImageSharp
                    .fluid
                }
                alt={"Project-Image- " + index}
              />
            )}

            <div className="project-name">
              {currentItem.node.frontmatter.title}
            </div>
          </span>
          <div className="project-title">
            {currentItem.node.frontmatter.title}
          </div>
          <div className="project-subtitle">
            {currentItem.node.frontmatter.subTitle}
          </div>
        </div>
      </Link>
    )

    return markUp
  })

  return (
    <div className="project-page-wrapper">
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
      </div>
      <div
        className={mMenuExpanded ? "category-items toggle" : "category-items"}
      >
        {categoryItemsMarkUp}
      </div>
      <div className="section-sub-title center">
        <span>{category + " Projects"}</span>
      </div>
      <div
        className="secondary-text"
        dangerouslySetInnerHTML={{
          __html: categoryItems.filter((currentItem, index) => {
            return currentItem.node.frontmatter.category === category
          })[0].node.html,
        }}
      ></div>
      <div className="project-gallery">{projectItemsMarkUp}</div>
    </div>
  )
}

export default ProjectLanding
