import React from "react"

const Statistics = () => {
  var today = new Date()
  var year = today.getFullYear()
  return (
    <div className="statistics-container">
      <div className="statistics-blurb-wrapper">
        <span>
          Established in 1944 with {year - 1944} years of experience, FRP has a
          broad portfolio of project types across a wide geographic region.
          Zoom, pan, and click the icons on the interactive map for details of
          some of FRP's work in recent decades.
        </span>
      </div>
    </div>
  )
}

export default Statistics
