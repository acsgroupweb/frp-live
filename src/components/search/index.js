import algoliasearch from "algoliasearch/lite"
import { default as React, useState } from "react"
import { InstantSearch, PoweredBy } from "react-instantsearch-dom"
import SearchBox from "./search-box"
import SearchResult from "./search-result"

const theme = {
  foreground: "#050505",
  background: "white",
  faded: "#888",
}

export default function Search({ indices, active }) {
  const [query, setQuery] = useState()

  const searchClient = algoliasearch(
    process.env.GATSBY_ALGOLIA_APP_ID,
    process.env.GATSBY_ALGOLIA_SEARCH_KEY
  )

  return (
    <InstantSearch
      searchClient={searchClient}
      indexName={indices[0].name}
      onSearchStateChange={({ query }) => {
        setQuery(query)
      }}
    >
      <SearchBox active={active} />
      <SearchResult
        indices={indices}
        className={
          query && query.length > 0 ? "search-result" : "search-result hide"
        }
      />
      <PoweredBy />
    </InstantSearch>
  )
}
