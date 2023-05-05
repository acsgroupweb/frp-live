import React, { createRef, useEffect } from "react"
import { connectSearchBox } from "react-instantsearch-dom"

export default connectSearchBox(({ refine, currentRefinement, active }) => {
  useEffect(() => {
    if (active) {
      inputRef.current.focus()
    }
  }, [active])
  const inputRef = createRef()

  return (
    <div>
      <form className="search-form">
        <input
          ref={inputRef}
          className="search-input"
          type="text"
          placeholder="Search frpinc.com"
          aria-label="Search"
          onChange={e => {
            refine(e.target.value)
          }}
          value={currentRefinement}
        />
      </form>
    </div>
  )
})
