import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Slider from "../components/slider"
import Intro from "../components/introduction"
import Project from "../components/project"
import Team from "../components/team"
import Experience from "../components/experience"
import Services from "../components/services"

const IndexPage = () => (
  <Layout>
    <meta name="algolia-site-verification"  content="8E35826A01699C73" />
    <SEO title="Home" />
    <Slider />
    <Intro />
    <Project />
    <Team />
    <Experience
      id="kmlMap"
      options={{
        center: { lat: 39.92483, lng: -86.10551 },
        zoom: 8,
      }}
    />
    <Services />
  </Layout>
)

export default IndexPage
