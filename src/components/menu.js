import { Link } from "gatsby"
import React, { useState } from "react"
import MenuData from "../../static/content/menu/menu.json"
import { FaLinkedin } from "react-icons/fa"
import { GoMail, GoLocation } from "react-icons/go"
// import SearchModal from "../components/search/search-modal"
// import useClickOutside from "../components/search/use-click-outside"

function ToggleButton(props) {
  return (
    <button
      aria-expanded={props.expanded}
      aria-controls="menu-list"
      onClick={props.onClick}
      className="top-menu-button"
    >
      <div className="bar1"></div>
      <div className="bar2"></div>
      <div className="bar3"></div>
    </button>
  )
}

function SubMenuButton(props) {
  return (
    <button
      aria-expanded={props.expanded}
      aria-controls="menu-list"
      onClick={props.onClick}
    >
      <span className="close"> &#9652;</span>
      <span className="open">&#9662;</span>
    </button>
  )
}

function Menu(props) {
  const menuItems = MenuData.TopMenu
  const [mMenuExpanded, setmMenuExpanded] = useState(false)
  // const [showSearch, setShowSearch] = useState(false)
  // const rootRef = createRef()
  // // useClickOutside(rootRef, () => setShowSearch(false))
  const [subMenuToggleStates, setSubMenuToggleStates] = useState(() => {
    var array1 = []
    for (let index = 0; index < menuItems.length; index++) {
      if (menuItems[index].submenu.length !== 0) {
        array1.push({
          mainMenuIndex: index,
          value: false,
        })
      }
    }
    return array1
  })

  const menuItemsMarkUp = menuItems.map((currentMenuItem, index) => {
    var toggleButtonMarkUp
    var subMenuMarkUp
    var subMenuMarkUpComplete
    var hasChildrenClassName
    if (currentMenuItem.submenu.length !== 0) {
      toggleButtonMarkUp = (
        <SubMenuButton
          expanded={
            subMenuToggleStates.find(
              ({ mainMenuIndex }) => mainMenuIndex === index
            ).value
          }
          onClick={() => {
            //creates shallow copy of the array. Needed for react to pick up state change

            const newArray = [...subMenuToggleStates]

            //the original object also changes with this change.
            // But that does not matter for react as long as there is a shallow copy of the array
            newArray.find(
              ({ mainMenuIndex }) => mainMenuIndex === index
            ).value = !subMenuToggleStates.find(
              ({ mainMenuIndex }) => mainMenuIndex === index
            ).value

            setSubMenuToggleStates(newArray)
          }}
        />
      )
      subMenuMarkUp = currentMenuItem.submenu.map(
        (currentSMenuItem, index1) => {
          return (
            <li key={"cli" + index1}>
              <Link to={currentSMenuItem.link}>{currentSMenuItem.name}</Link>
            </li>
          )
        }
      )

      subMenuMarkUpComplete = (
        <ul key={"cul" + index} className="sub-menu">
          {subMenuMarkUp}
        </ul>
      )

      hasChildrenClassName = "has-children"
    }

    return (
      <li key={"pli" + index} className={hasChildrenClassName}>
        <Link
          to={currentMenuItem.link}
          activeClassName="activeMenu"
          partiallyActive={currentMenuItem.name === "Home" ? false : true}
        >
          {currentMenuItem.name}
        </Link>
        {toggleButtonMarkUp}
        {subMenuMarkUpComplete}
      </li>
    )
  })

  return (
    <nav className="menu">
      <div className="mobile-buttons-area">
        <ToggleButton
          expanded={mMenuExpanded}
          onClick={() => {
            setmMenuExpanded(!mMenuExpanded)
            props.toggleHandler(!mMenuExpanded)
          }}
        />
        <div className="vertical-bar-small"></div>
        <Link to="/contact">
          <GoMail />
        </Link>
        <a
          href="https://maps.google.com/?q=Fink%20Roberts%20&%20Petrie%20Inc%209449%20Priority%20Way%20West%20Drive%20-%20Suite%20200%20Indianapolis,%20Indiana%2046240"
          target="_blank"
          rel="noreferrer"
        >
          <GoLocation />
        </a>
      </div>
      <ul className="menu-list">{menuItemsMarkUp}</ul>
      <div className="vertical-bar"></div>
      <ul className="info-list">
        <li className="linkedin-icon">
          <a
            href="https://www.linkedin.com/company/fink-roberts-&-petrie-inc-"
            target="_blank"
            rel="noreferrer"
          >
            <FaLinkedin />
          </a>
        </li>
        {/* <li className="search-icon">
          <span
            onClick={() => {
              setShowSearch(true)
            }}
          >
            <FaSearch />
          </span>
        </li> */}
      </ul>
      {/* <div ref={rootRef} className={showSearch ? "modal show" : "modal"}>
        <SearchModal
          onSearchClick={() => {
            setShowSearch(false)
          }}
          onKeyClick={e => {
            if (e.keyCode === 27) {
              setShowSearch(false)
            }
          }}
          active={showSearch}
        />
      </div> */}
    </nav>
  )
}

export default Menu
