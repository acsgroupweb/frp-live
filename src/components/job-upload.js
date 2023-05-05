import React from "react"
import ReCAPTCHA from "react-google-recaptcha"
import Loading from "../images/loading.gif"

function encode(data) {
  // return Object.keys(data)
  //   .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
  //   .join("&")

  const formData = new FormData()
  Object.keys(data).forEach(k => {
    formData.append(k, data[k])
  })
  return formData
}

export default class JobUploadForm extends React.Component {
  constructor(props) {
    super(props)
    this.domRef = React.createRef()
    this.state = {
      feedbackMsg: null,
      errors: null,
      uploadText: "No File Uploaded",
      submitting: false,
    }
    this.fileUploadRef = React.createRef()
    this.recaptchaRef = React.createRef()
    this.feedbackRef = React.createRef()
  }

  onRCChange = value => {
    this.setState({ "g-recaptcha-response": value })
  }

  onFileChange = () => {
    //console.log(this.state)
    this.setState({
      file: this.fileUploadRef.current.files[0],
      uploadText: this.fileUploadRef.current.files[0].name,
    })
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
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

    if (!this.state["file"]) {
      validForm = false
      errors["file"] = "Please upload your resume."
    } else if (typeof this.state["file"] !== "undefined") {
      let fileNameArr = this.state["file"].name.split(".")
      let fileExtension = fileNameArr[fileNameArr.length - 1]

      if (
        fileExtension !== "pdf" &&
        fileExtension !== "docx" &&
        fileExtension !== "doc"
      ) {
        validForm = false
        errors["file"] = "Only doc, docx, pdf allowed."
      }

      if (this.state["file"].size > 2000000) {
        validForm = false
        errors["file"] = "File size should be less than 2 MB."
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
    //console.log(this.state)
    return validForm
  }

  handleSubmit = e => {
    e.preventDefault()

    if (!this.validateForm()) {
      return
    }
    let myForm = this.domRef.current
    let formData = new FormData(myForm)

    this.setState({ submitting: true })

    fetch("/", {
      method: "POST",
      body: formData,
    })
      .then(() => {
        this.setState({
          firstName: "",
          lastName: "",
          email: "",
          file: null,
          message: "",
          feedbackMsg: "Your Form is Submitted! Thank you for contacting us!",
          "g-recaptcha-response": null,
          errors: null,
          uploadText: "No File Uploaded",
          submitting: false,
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
        //console.log(error)
        this.setState({
          firstName: "",
          lastName: "",
          email: "",
          file: null,
          message: "",
          "g-recaptcha-response": null,
          feedbackMsg: "There was an error! We will get back to you shortly",
          errors: null,
          uploadText: "No File Uploaded",
          submitting: false,
        })
      })
  }

  render() {
    console.log(this.state)
    return (
      <>
        <div className="contact-form contact-form--job-upload">
          {this.state.feedbackMsg && (
            <div className="error-message" ref={this.feedbackRef}>
              {this.state.feedbackMsg}
            </div>
          )}
          <form
            name="job"
            method="post"
            action="/"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            data-netlify-recaptcha="true"
            onSubmit={this.handleSubmit}
            ref={this.domRef}
            noValidate={true}
            className={this.state.submitting ? "hide" : ""}
          >
            {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
            <input type="hidden" name="form-name" value="job" />

            <div hidden>
              <label>
                Don’t fill this out:{" "}
                <input name="bot-field" onChange={this.handleChange} />
              </label>
            </div>
            <div hidden>
              <label>
                Don’t fill this out:{" "}
                <input
                  name="jobName"
                  onChange={this.handleChange}
                  value={this.props.jobName}
                />
              </label>
            </div>
            <img
              className={this.state.submitting ? "loading show" : "loading"}
              src={Loading}
              alt="Logo"
            />
            <div className="field">
              <div className="control">
                <input
                  className="input"
                  type={"text"}
                  name={"firstName"}
                  onInput={this.handleChange}
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
                  onInput={this.handleChange}
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
                  onInput={this.handleChange}
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
                <label
                  htmlFor="file"
                  className="red-fill-button red-fill-button--file"
                >
                  Upload Cover Letter and Resume
                </label>
                <input
                  className="input"
                  ref={this.fileUploadRef}
                  type={"file"}
                  name={"file"}
                  onInput={this.onFileChange}
                  id={"file"}
                  required={true}
                />
                <div className="file-upload-text">{this.state.uploadText}</div>
                <div className="status-message">
                  <span>Please upload cover letter and resume in one file</span>
                  <span>
                    Acceptable File Types: doc, docx, pdf. Max. file size: 2mb
                  </span>
                </div>
                {this.state.errors && this.state.errors["file"] && (
                  <div className="error-message">
                    {this.state.errors["file"]}
                  </div>
                )}
              </div>
            </div>
            <div className="field">
              <div className="control">
                <textarea
                  className="textarea"
                  name={"message"}
                  onInput={this.handleChange}
                  id={"message"}
                  placeholder={"Message"}
                />
              </div>
              {this.state.errors && this.state.errors["message"] && (
                <div className="error-message" style={{ marginBottom: `20px` }}>
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
      </>
    )
  }
}
