import { Link } from "gatsby"
import { default as React } from "react"
import {
  connectStateResults,
  Highlight,
  Hits,
  Index,
  Snippet,
  Pagination,
} from "react-instantsearch-dom"

const HitCount = connectStateResults(({ searchResults }) => {
  const hitCount = searchResults && searchResults.nbHits

  return hitCount > 0 ? (
    <div className="HitCount">
      {searchResults.index + " " + hitCount + " "}result
      {hitCount !== 1 ? `s` : ``}
    </div>
  ) : (
    <div>
      <div className="HitCount">{searchResults && searchResults.index}</div>
      <div className="no-result">No Results</div>
    </div>
  )
})

const PageHit = ({ hit }) => {
  //console.log(hit)
  return (
    <div>
      <Link to={hit.slug}>
        <h4>
          <Highlight attribute="title" hit={hit} tagName="mark" />
        </h4>
        <Highlight
          attribute="location"
          hit={hit}
          tagName="mark"
          className="location"
        />
        <Snippet attribute="excerpt" hit={hit} tagName="mark" />
      </Link>
    </div>
  )
}

const HitsInIndex = ({ index }) => (
  <Index indexName={index.name}>
    <HitCount />
    <Hits className="Hits" hitComponent={PageHit} />
    <Pagination />
  </Index>
)

const SearchResult = ({ indices, className, show }) => {
  return (
    <div className={className}>
      {indices.map(index => (
        <HitsInIndex index={index} key={index.name} />
      ))}
    </div>
  )
}

export default SearchResult
