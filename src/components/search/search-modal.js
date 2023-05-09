import React, { useEffect } from "react"
import Search from "./index"

const searchIndices = [
  { name: `Projects`, title: `Projects` },
  { name: `Team`, title: `Team` },
  { name: `News`, title: `News` },
]

const SearchModal = props => {
  useEffect(() => {
    document.addEventListener("keydown", props.onKeyClick, false)
    return () => {
      document.removeEventListener("keydown", props.onKeyClick, false)
    }
  }, [props.active])
  return (
    <div className="search-modal">
      <Search indices={searchIndices} active={props.active} />
    </div>
  )
}

export default SearchModal
