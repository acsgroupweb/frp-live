import React from "react"
import { graphql } from "gatsby"
import JobUploadForm from "../components/job-upload"
import Layout from "../components/layout"

export default function JobsSingle({ data }) {
  const job = data.markdownRemark
  const mainText = job.html.slice(job.html.indexOf("<h1>Main Text</h1>") + 19)
  return (
    <Layout>
      <div className="contact-container">
        <div className="section-title">
          <span className="top-text">{job.frontmatter.title}</span>
          <span className="horizontal-line"></span>
        </div>
        <div className="contact-content-wrapper">
          <div
            className="single-page-content single-page-content--job-upload"
            dangerouslySetInnerHTML={{ __html: mainText }}
          />
          <JobUploadForm jobName={job.frontmatter.title} />
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`
