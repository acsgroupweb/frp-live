import { Link } from "gatsby"
import { useStaticQuery, graphql } from "gatsby"
import PropTypes from "prop-types"
import React, { useState } from "react"
import Img from "gatsby-image"
import Menu from "./menu"
import Queries from "../utils/algolia-queries"

const Header = ({ siteTitle }) => {
  const data = useStaticQuery(graphql`
    {
      allFile(filter: { name: { in: ["frpinc-logo"] } }) {
        edges {
          node {
            childImageSharp {
              # Specify a fixed image and fragment.
              # The default width is 400 pixels
              fluid(maxWidth: 400, quality: 100) {
                ...GatsbyImageSharpFluid_withWebp_noBase64
              }
            }
          }
        }
      }
    }
  `)

  //console.log(Queries)

  const [toggleStatus, setToggleStatus] = useState(false)
  const [searchStatus, setSearchStatus] = useState(false)

  function changeToggleState(newValue) {
    setToggleStatus(newValue)
  }

  function changeSearchState(newValue) {
    setSearchStatus(newValue)
  }

  return (
    <header
      className={toggleStatus ? "header-wrapper toggle" : "header-wrapper"}
    >
      <div
        className={
          searchStatus
            ? "header-content-wrapper toggle-search"
            : "header-content-wrapper"
        }
        // className="header-content-wrapper"
      >
        <div className="logo-area">
          <Link to="/">
            <Img
              fluid={data.allFile.edges[0].node.childImageSharp.fluid}
              alt="Logo"
            />
          </Link>
        </div>
        <div className="menu-area">
          <Menu
            toggleHandler={changeToggleState}
            searchHandler={changeSearchState}
          />
        </div>
      </div>
    </header>
  )
}
Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: `FRP INC`,
}

export default Header
