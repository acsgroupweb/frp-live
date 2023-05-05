import React from "react"
import ReCAPTCHA from "react-google-recaptcha"
import Layout from "../components/layout"
import Map from "../components/contact-map"

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&")
}

export default class Contact extends React.Component {
  constructor(props) {
    super(props)
    this.domRef = React.createRef()
    this.state = { feedbackMsg: null, errors: null }
    this.recaptchaRef = React.createRef()
    this.feedbackRef = React.createRef()
  }

  onRCChange = value => {
    this.setState({ "g-recaptcha-response": value })
  }

  handleChange = e => {
    //this.validateForm(e.target.name)
    this.setState({ [e.target.name]: e.target.value })
    //console.log(this.state)
  }

  validateForm = name => {
    let validForm = true
    let errors = {}

    if (!this.state["firstName"]) {
      validForm = false
      errors["firstName"] = "First Name field cannot be empty"
    } else if (typeof this.state["firstName"] !== "undefined") {
      if (!this.state["firstName"].match(/^[a-zA-Z]+$/)) {
        validForm = false
        errors["firstName"] = "Only letters"
      }
    }

    if (!this.state["lastName"]) {
      validForm = false
      errors["lastName"] = "Last Name field cannot be empty"
    } else if (typeof this.state["lastName"] !== "undefined") {
      if (!this.state["lastName"].match(/^[a-zA-Z]+$/)) {
        validForm = false
        errors["lastName"] = "Only letters"
      }
    }

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

    if (!this.state["phone"]) {
      validForm = false
      errors["phone"] = "Phone field cannot be empty"
    } else if (typeof this.state["phone"] !== "undefined") {
      if (!this.state["phone"].match(/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/)) {
        validForm = false
        errors["phone"] = "Phone Number is not valid. For eg. 317-553-4354"
      }
    }

    if (!this.state["message"]) {
      validForm = false
      errors["message"] = "Message field cannot be empty"
    }

    if (
      this.state[`g-recaptcha-response`] === null ||
      this.state[`g-recaptcha-response`] === undefined
    ) {
      validForm = false
      errors["recaptcha"] = "Recaptcha must be selected"
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
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          message: "",
          feedbackMsg: "Your Form is Submitted! Thank you for contacting us!",
          "g-recaptcha-response": null,
        })

        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0

        setTimeout(() => {
          this.setState({ feedbackMsg: "" })
        }, 10000)

        this.domRef.current.reset()
        this.recaptchaRef.current.reset()
      })
      .catch(error => {
        this.setState({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          message: "",
          "g-recaptcha-response": null,
          feedbackMsg: "There was an error! We will get back to you shortly",
        })
      })
  }

  render() {
    return (
      <Layout>
        <div className="contact-container">
          <div className="section-title">
            <span className="top-text">
              Cont<span className="half-color">a</span>ct
            </span>
            <span className="horizontal-line"></span>
          </div>
          <div className="contact-content-wrapper">
            <div className="contact-form">
              {this.state.feedbackMsg && (
                <div className="error-message" ref={this.feedbackRef}>
                  {this.state.feedbackMsg}
                </div>
              )}
              <form
                name="contact"
                method="post"
                action="/contact"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                data-netlify-recaptcha="true"
                onSubmit={this.handleSubmit}
                ref={this.domRef}
                noValidate={true}
              >
                {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
                <input type="hidden" name="form-name" value="contact" />
                <div hidden>
                  <label>
                    Don’t fill this out:{" "}
                    <input name="bot-field" onChange={this.handleChange} />
                  </label>
                </div>
                <div className="field">
                  <div className="control">
                    <input
                      className="input"
                      type={"text"}
                      name={"firstName"}
                      onChange={this.handleChange}
                      id={"firstName"}
                      placeholder={"First Name"}
                    />
                    {this.state.errors && this.state.errors["firstName"] && (
                      <div className="error-message">
                        {this.state.errors["firstName"]}
                      </div>
                    )}
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <input
                      className="input"
                      type={"text"}
                      name={"lastName"}
                      onChange={this.handleChange}
                      id={"lastName"}
                      placeholder={"Last Name"}
                    />
                    {this.state.errors && this.state.errors["lastName"] && (
                      <div className="error-message">
                        {this.state.errors["lastName"]}
                      </div>
                    )}
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <input
                      className="input"
                      type={"email"}
                      name={"email"}
                      onChange={this.handleChange}
                      id={"email"}
                      placeholder={"E-mail Address"}
                    />
                    {this.state.errors && this.state.errors["email"] && (
                      <div className="error-message">
                        {this.state.errors["email"]}
                      </div>
                    )}
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <input
                      className="input"
                      type={"phone"}
                      name={"phone"}
                      onChange={this.handleChange}
                      id={"phone"}
                      required={true}
                      placeholder={"Phone Number XXX-XXX-XXXX"}
                    />
                    {this.state.errors && this.state.errors["phone"] && (
                      <div className="error-message">
                        {this.state.errors["phone"]}
                      </div>
                    )}
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <textarea
                      className="textarea"
                      name={"message"}
                      onChange={this.handleChange}
                      id={"message"}
                      placeholder={"Message"}
                    />
                  </div>
                  {this.state.errors && this.state.errors["message"] && (
                    <div
                      className="error-message"
                      style={{ marginBottom: `20px` }}
                    >
                      {this.state.errors["message"]}
                    </div>
                  )}
                </div>
                <div className="recaptha">
                  <ReCAPTCHA
                    ref={this.recaptchaRef}
                    sitekey={process.env.GATSBY_SITE_RECAPTCHA_KEY}
                    onChange={this.onRCChange}
                  />
                </div>
                {this.state.errors && this.state.errors["recaptcha"] && (
                  <div className="error-message" style={{ margin: 5 }}>
                    {this.state.errors["recaptcha"]}
                  </div>
                )}
                <div className="field">
                  <button className="red-fill-button submit" type="submit">
                    Submit
                  </button>
                </div>
              </form>
            </div>
            <div className="contact-map-wrapper">
              <Map
                id="contactMap"
                options={{
                  center: { lat: 39.92483, lng: -86.10551 },
                  zoom: 15,
                }}
              />
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}
