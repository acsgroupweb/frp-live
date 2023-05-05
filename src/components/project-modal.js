import React, { useEffect, useRef, useState } from "react"
import Slider from "../components/slider1"

const ProjectModal = props => {
  const activeModal = useRef(null)
  const [mHeight, setMHeight] = useState(0)

  useEffect(
    () => {
      document.addEventListener("keydown", props.onProjectClick, false)

      if (props.isActive) {
        setMHeight(activeModal.current.clientHeight)
      }

      return () => {
        document.removeEventListener("keydown", props.onProjectClick, false)
      }
    },
    [props.isActive, props.onProjectClick],
    [] //
  )

  return (
    <div className="project-content">
      <div ref={activeModal} className="project-content-header">
        <span
          className="close"
          onClick={props.onProjectClick}
          key={"close-" + props.index}
          role="button"
          aria-label={"Close Project Button" + (props.index + 1)}
          tabIndex={props.index}
          onKeyDown={props.onProjectClick}
        >
          &times;
        </span>
        <div className="project-title" style={{ width: "80%" }}>
          {props.projectItem.node.frontmatter.title}
        </div>
        <div className="project-subTitle" style={{ width: "80%" }}>
          {props.projectItem.node.frontmatter.location}
        </div>
      </div>
      <div
        className="project-content-img-desc"
        style={{ marginTop: mHeight, height: `calc(70vh - ${mHeight}px)` }}
      >
        <div className="project-content-image">
          <Slider
            images={props.projectItem.node.frontmatter.sliderImages}
            displayArrowButtons={true}
            displayCreditBelowImage={false}
            autoScroll={false}
          />
        </div>
        <div
          className="project-content-description"
          dangerouslySetInnerHTML={{ __html: props.projectItem.node.html }}
        ></div>
      </div>
    </div>
  )
}

export default ProjectModal
