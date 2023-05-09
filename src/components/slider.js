import React, { useState, useEffect } from "react"
import Img from "gatsby-image"
import { useStaticQuery, graphql } from "gatsby"
import { useSwipeable } from "react-swipeable"

const Slider = ({ children }) => {
  const [slideIndex, setSlideIndex] = useState(1)
  useEffect(() => {})
  const data = useStaticQuery(graphql`
    {
      slider: allMarkdownRemark(
        filter: { frontmatter: { layout: { eq: "home-slider" } } }
      ) {
        edges {
          node {
            frontmatter {
              sliderImages {
                smallImage: image {
                  childImageSharp {
                    # Specify a fixed image and fragment.
                    # The default width is 400 pixels
                    fluid(maxWidth: 500, maxHeight: 240, quality: 50) {
                      ...GatsbyImageSharpFluid_withWebp
                    }
                  }
                }
                largeImage: image {
                  childImageSharp {
                    # Specify a fixed image and fragment.
                    # The default width is 400 pixels
                    fluid(maxWidth: 2500, maxHeight: 1200, quality: 50) {
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
    }
  `)

  //console.log(data)

  const handlers = useSwipeable({
    onSwipedLeft: () => calculateSliderIndex(1),
    onSwipedRight: () => calculateSliderIndex(-1),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
    trackTouch: true,
  })

  const calculateSliderIndex = n => {
    var newSlideIndex = slideIndex + n
    if (newSlideIndex > images.length) {
      setSlideIndex(1)
    } else if (newSlideIndex < 1) {
      setSlideIndex(images.length)
    } else {
      setSlideIndex(newSlideIndex)
    }
  }

  var images = data.slider.edges[0].node.frontmatter.sliderImages

  //console.log(images)

  useEffect(() => {
    const calculateSliderIndex1 = n => {
      var newSlideIndex = slideIndex + n
      //console.log(newSlideIndex)

      if (newSlideIndex > images.length) {
        setSlideIndex(1)
      } else if (newSlideIndex < 1) {
        setSlideIndex(images.length)
      } else {
        setSlideIndex(newSlideIndex)
      }
    }
    const timeout = setTimeout(() => {
      calculateSliderIndex1(1)
    }, 6000)

    return () => clearTimeout(timeout)
  }, [slideIndex, images])

  //  console.log(images)
  var sliderImagesMarkUp = images.map((currentItem, index) => {
    const sources = [
      currentItem.smallImage.childImageSharp.fluid,
      {
        ...currentItem.largeImage.childImageSharp.fluid,
        media: `(min-width: 500px)`,
      },
    ]
    return (
      <div
        className="slide fade"
        key={"slider-" + index}
        style={
          index + 1 === slideIndex ? { display: "block" } : { display: "none" }
        }
      >
        <div className="slider-text-container">
          <span className="slider-main-text">Structural Engineering</span>
          <div
            className="slider-secondary-text"
            dangerouslySetInnerHTML={{ __html: data.slider.edges[0].node.html }}
          />
        </div>
        <Img fluid={sources} alt={"Slider " + index} />
        {currentItem.credit && (
          <div className="credit-gray">{currentItem.credit}</div>
        )}
      </div>
    )
  })

  var boxImagesMarkUp = images.map((currentItem, index) => {
    return (
      <span
        className={
          (index + 1 === slideIndex ? "box active" : "box") +
          " item" +
          (index + 1)
        }
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
      {/* <MoveLeftButton
        onClick={() => {
          calculateSliderIndex(-1)
        }}
      />
      <MoveRightButton
        onClick={() => {
          calculateSliderIndex(1)
        }}
      /> */}
      <div className="box-container">
        <div className="box-wrapper">{boxImagesMarkUp}</div>
      </div>
    </div>
  )
}

export default Slider
