import algoliasearch from "algoliasearch/lite"
import { useContext } from "react"
import { Link } from "react-router-dom"
import {
  Configure,
  InstantSearch,
  useHits,
  useSearchBox,
} from "react-instantsearch-hooks-web"

import { NavBarContext } from "components/common/NavBar"

import Filters from "components/search/Filters"
import Results from "components/search/Results"
import HotComics from "components/search/HotComics"

const INDEX_NAME = "comic_dev"
const HITS_PER_PAGE = 10
const searchClient = algoliasearch("9E5QQ1C8WZ", "c476e3b9463ab96d4f284b5b8f6764de")


type Issue = {
  id: string
  title_name: string
  issue_num: string
  publisher_name: string
  cpg_id: string
  volume: string
  year: string
  cover_price:string
  issue_comment:string
  age:string
}



function Page() {
  const { clear, refine } = useSearchBox()
  const { text: navBarText } = useContext(NavBarContext)
  const { hits } = useHits<Issue>()

  if (navBarText) {
    refine(navBarText)
  } else {
    clear()
  }

  return (
    <div className="flex flex-row space-x-2 items-center">
      <div className="mt-10 flex w-full">
        <div className="flex w-full gap-10">
          <Filters />
          <Results hits={hits} />
          {/* <HotComics /> */}
        </div>
      </div>
    </div>
  )
}

export default function Search() {
  return (
    <InstantSearch searchClient={searchClient} indexName={INDEX_NAME}>
      <Configure hitsPerPage={HITS_PER_PAGE} />
      <Page />
    </InstantSearch>
  )
}
