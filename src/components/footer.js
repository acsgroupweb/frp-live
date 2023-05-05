import React from "react"
import { Link } from "gatsby"
import { FaLinkedin } from "react-icons/fa"

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&")
}

export default class Footer extends React.Component {
  constructor(props) {
    super(props)
    this.domRef = React.createRef()
    this.state = { feedbackMsg: null, errors: null }
    this.feedbackRef = React.createRef()
  }

  handleChange = e => {
    //this.validateForm(e.target.name)
    this.setState({ [e.target.name]: e.target.value })
    //console.log(this.state)
  }

  validateForm = name => {
    let validForm = true
    let errors = {}

    if (!this.state["email"]) {
      validForm = false
      errors["email"] = "E-mail field cannot be empty"
    } else if (typeof this.state["email"] !== "undefined") {
      let lastAtPos = this.state["email"].lastIndexOf("@")
      let lastDotPos = this.state["email"].lastIndexOf(".")

      if (
        !(
          lastAtPos < lastDotPos &&
          lastAtPos > 0 &&
          this.state["email"].indexOf("@@") === -1 &&
          lastDotPos > 2 &&
          this.state["email"].length - lastDotPos > 2
        )
      ) {
        validForm = false
        errors["email"] = "E-mail is not valid"
      }
    }

    this.setState({ errors: errors })

    return validForm
  }

  handleSubmit = e => {
    e.preventDefault()
    if (!this.validateForm()) {
      return
    }

    const form = e.target
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": form.getAttribute("name"),
        ...this.state,
      }),
    })
      .then(() => {
        this.setState({
          email: "",
          feedbackMsg: "Thank you for subscribing to FRP news!",
        })

        setTimeout(() => {
          this.setState({ feedbackMsg: "" })
        }, 10000)

        this.domRef.current.reset()
      })
      .catch(error => {
        this.setState({
          email: "",
          feedbackMsg: "There was an error! We will get back to you shortly",
        })
      })
  }

  render() {
    return (
      <div className="footer-container">
        <div className="footer-main">
          <div className="address-section">
            <div className="title">Fink Roberts & Petrie, Inc.</div>
            <div className="content">
              <div className="address">
                3535 East 96th Street, Suite 126 <br /> Indianapolis, IN 46240
              </div>
              <div className="phone-number">Office +1(317) 872-8400</div>
              <div className="phone-number">Fax +1(317) 876-2408</div>
            </div>
          </div>

          <div className="quick-links-section">
            <div className="title">Quick Links</div>
            <div className="content">
              <Link to="/about">About</Link>
              <Link to="/team">Team</Link>
              <Link to="/projects">Projects</Link>
              <Link to="/news">News</Link>
              <Link to="/careers">Careers</Link>
              <Link to="/contact">Contact</Link>
            </div>
          </div>
          <div className="vertical-line"></div>
          <div className="news-section">
            <div className="title">Subscribe to News</div>
            <div className="content">
              {this.state.feedbackMsg && (
                <div className="error-message" ref={this.feedbackRef}>
                  {this.state.feedbackMsg}
                </div>
              )}
              {this.state.errors && this.state.errors["email"] && (
                <div className="error-message">
                  {this.state.errors["email"]}
                </div>
              )}
              <div className="newsletter-section">
                <div>
                  <form
                    name="newsletter"
                    method="post"
                    action="/"
                    data-netlify="true"
                    data-netlify-honeypot="bot-field"
                    onSubmit={this.handleSubmit}
                    ref={this.domRef}
                    noValidate={true}
                  >
                    {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
                    <input type="hidden" name="form-name" value="newsletter" />
                    <div hidden>
                      <label>
                        Don’t fill this out:{" "}
                        <input name="bot-field" onChange={this.handleChange} />
                      </label>
                    </div>
                    <input
                      className="newsletter-box"
                      type={"email"}
                      name={"email"}
                      placeholder="E-mail Address"
                      onChange={this.handleChange}
                    />
                    <button
                      className="go-button"
                      aria-label="Subscribe to Newsletter"
                      type="submit"
                    >
                      GO
                    </button>
                  </form>
                </div>
              </div>

              <div>
                <Link to="/contact" className="contact-button">
                  Contact Us
                </Link>
              </div>

              <div className="social-section">
                <div className="horizontal-line"></div>
                <a
                  href="https://www.linkedin.com/company/fink-roberts-&-petrie-inc-"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaLinkedin />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-copyright">
          <div className="copyrights-wrapper">
            &#169; 2021 Fink Roberts & Petrie, Inc. All Rights Reserved.{" "}
            <a
              href="https://www.crosspixel.in"
              target="_blank"
              rel="noreferrer"
            >
              Designed by Crosspixel
            </a>
          </div>
        </div>
      </div>
    )
  }
}
