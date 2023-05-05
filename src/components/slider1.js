import React, { useState, useEffect } from "react"
import Img from "gatsby-image"
import { useSwipeable } from "react-swipeable"
import { FaAngleRight, FaAngleLeft } from "react-icons/fa"

function MoveRightButton(props) {
  return (
    <button onClick={props.onClick} className="right-button">
      <FaAngleRight />
    </button>
  )
}

function MoveLeftButton(props) {
  return (
    <button onClick={props.onClick} className="left-button">
      <FaAngleLeft />
    </button>
  )
}

const Slider1 = props => {
  const [slideIndex, setSlideIndex] = useState(1)

  useEffect(() => {
    if (props.autoScroll) {
      const calculateSliderIndex1 = n => {
        var newSlideIndex = slideIndex + n
        //console.log(newSlideIndex)
        if (newSlideIndex > props.images.length) {
          setSlideIndex(1)
        } else if (newSlideIndex < 1) {
          setSlideIndex(props.images.length)
        } else {
          setSlideIndex(newSlideIndex)
        }
      }
      const timeout = setTimeout(() => {
        calculateSliderIndex1(1)
      }, 4000)
      return () => clearTimeout(timeout)
    }
  }, [slideIndex, props.images, props.autoScroll])

  const handlers = useSwipeable({
    onSwipedLeft: () => calculateSliderIndex(1),
    onSwipedRight: () => calculateSliderIndex(-1),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
    trackTouch: true,
  })

  const calculateSliderIndex = n => {
    var newSlideIndex = slideIndex + n
    if (newSlideIndex > props.images.length) {
      setSlideIndex(1)
    } else if (newSlideIndex < 1) {
      setSlideIndex(props.images.length)
    } else {
      setSlideIndex(newSlideIndex)
    }
  }

  var sliderImagesMarkUp = props.images.map((currentItem, index) => {
    return (
      <div
        className="slide fade"
        key={"slider-" + index}
        style={
          index + 1 === slideIndex ? { display: "block" } : { display: "none" }
        }
      >
        <div>
          {currentItem.image && (
            <Img
              fluid={currentItem.image.childImageSharp.fluid}
              alt={"Slider " + index}
            />
          )}
          {currentItem.credit && !props.displayCreditBelowImage && (
            <div className="credit">{currentItem.credit}</div>
          )}
        </div>
        {currentItem.credit && props.displayCreditBelowImage && (
          <div className="creditBelowImage">
            <span>{currentItem.credit}</span>
          </div>
        )}
      </div>
    )
  })

  var boxImagesMarkUp = props.images.map((currentItem, index) => {
    return (
      <span
        className={(index + 1 === slideIndex ? "box active" : "box") + " item"}
        key={"box-" + index}
        onClick={() => {
          setSlideIndex(index + 1)
        }}
        role="button"
        aria-label={"Slider Button" + (index + 1)}
        tabIndex={index}
        onKeyDown={() => {
          setSlideIndex(index + 1)
        }}
      ></span>
    )
  })

  return (
    <div className="slider-container" {...handlers}>
      {sliderImagesMarkUp}
      {props.displayArrowButtons && props.images.length > 1 && (
        <MoveLeftButton
          onClick={() => {
            calculateSliderIndex(-1)
          }}
        />
      )}
      {props.displayArrowButtons && props.images.length > 1 && (
        <MoveRightButton
          onClick={() => {
            calculateSliderIndex(1)
          }}
        />
      )}
      {props.images.length > 1 && (
        <div className="box-container">
          <div
            className="box-wrapper"
            style={
              props.displayCreditBelowImage ? { marginBottom: `40px` } : {}
            }
          >
            {boxImagesMarkUp}
          </div>
        </div>
      )}
    </div>
  )
}

export default Slider1
