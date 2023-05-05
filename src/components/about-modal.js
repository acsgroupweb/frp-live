import React, { useEffect, useRef, useState } from "react"
import Slider from "../components/slider1"

const AboutModal = props => {
  const activeModal = useRef(null)
  const [mHeight, setMHeight] = useState(0)

  useEffect(
    () => {
      document.addEventListener("keydown", props.onAboutClick, false)

      if (props.isActive) {
        setMHeight(activeModal.current.clientHeight)
      }

      return () => {
        document.removeEventListener("keydown", props.onAboutClick, false)
      }
    },
    [props.isActive, props.onAboutClick],
    [] //
  )
  return (
    <div className="project-content">
      <div ref={activeModal} className="project-content-header">
        <span
          className="close"
          onClick={props.onAboutClick}
          key={"close-" + props.index}
          role="button"
          aria-label={"Close Button" + (props.index + 1)}
          tabIndex={props.index}
          onKeyDown={props.onAboutClick}
        >
          &times;
        </span>
        <div className="project-title">
          {props.historyItem.frontmatter.title}
        </div>
      </div>
      <div
        className="project-content-img-desc"
        style={{ marginTop: mHeight, height: `calc(70vh - ${mHeight}px)` }}
      >
        <div className="project-content-image">
          <Slider
            images={props.historyItem.frontmatter.sliderImages}
            displayArrowButtons={true}
            displayCreditBelowImage={true}
          />
        </div>
        <div
          className="project-content-description"
          dangerouslySetInnerHTML={{
            __html:
              "<p>" +
              props.historyItem.htmlAst.children.filter(item => {
                return item.tagName === "p"
              })[1].children[0].value +
              "</p>",
          }}
        ></div>
      </div>
    </div>
  )
}

export default AboutModal
