import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Projects from "../components/project-landing"

const ProjectPage = ({ location }) => {
  //console.log(location)
  var projectCategory = "All"
  var scrollPosition = 0
  if (
    location.state !== null &&
    location.state !== undefined &&
    location.state.projectCategory !== undefined
  ) {
    const { state = {} } = location
    projectCategory = state.projectCategory
  }

  return (
    <Layout>
      <SEO title="Projects" />
      <div className="projects-page-container">
        <Projects
          category={projectCategory}

          //category={location.state.projectCategory}
        />
      </div>
    </Layout>
  )
}

export default ProjectPage
