import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Team from "../components/team-landing"

const TeamPage = ({ location }) => {
  //console.log(location)

  return (
    <Layout>
      <SEO title="Team" />
      <div className="team-page-container">
        <Team />
      </div>
    </Layout>
  )
}

export default TeamPage
