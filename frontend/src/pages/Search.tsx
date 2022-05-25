import algoliasearch from "algoliasearch/lite"
import { useContext } from "react"
import { Link } from "react-router-dom"
import {
  Configure,
  InstantSearch,
  RefinementList,
  useHits,
  useSearchBox,
} from "react-instantsearch-hooks-web"

import { NavBarContext } from "components/common/NavBar"
import { getIssueImage } from "utils/imagePath"

const INDEX_NAME = "tmp-index"
const HITS_PER_PAGE = 7
const REFINEMENT_LIST_LIMIT = 16

const searchClient = algoliasearch("SGT5R38GFV", "30905cb33c45654eb5159c7f1197bb43")

type RefinementProps = {
  title: string
  attribute: string
}

type Issue = {
  id: string
  title: string
  issue: string
  publisher: string
}

type ResultsProps = {
  hits: Issue[]
}

function Refinement({ attribute, title }: RefinementProps) {
  return (
    <div className="flex flex-col">
      <p className="text-lg font-bold uppercase">{title}</p>
      <RefinementList
        attribute={attribute}
        limit={REFINEMENT_LIST_LIMIT}
        sortBy={["name:asc"]}
        classNames={{
          label: "flex gap-2 items-center",
          labelText: "font-bold",
          count: "text-slate-500",
        }}
      />
    </div>
  )
}

function Result({ id, title, issue, publisher }: Issue) {
  return (
    <Link to={`/details/${id}`}>
      <div className="my-3 flex w-[500px] gap-3 bg-slate-200 px-3 py-3 hover:scale-[1.02]">
        <img src={getIssueImage(id)} alt="" className="h-auto w-[80px]" />
        <div className="mt-2 flex flex-col">
          <p className="font-bold">{`${title} - #${issue}`}</p>
          <p className="text-xs uppercase">{publisher}</p>
        </div>
      </div>
    </Link>
  )
}

function Refinements() {
  return (
    <div className="flex flex-col gap-5">
      <Refinement title="Publisher" attribute="publisher" />
      <Refinement title="Title" attribute="title" />
      <Refinement title="Era" attribute="age" />
      <Refinement title="Publication Year" attribute="publication_year" />
    </div>
  )
}

function Results({ hits }: ResultsProps) {
  return (
    <div className="flex flex-col">
      <p className="text-xl font-extrabold uppercase">Results</p>
      {hits.map((hit) => (
        <Result key={hit.id} {...hit} />
      ))}
    </div>
  )
}

function HotComics() {
  return (
    <div className="ml-20 flex flex-col gap-3">
      <p className="text-xl font-extrabold uppercase">Hot Comics</p>
      <div className="flex flex-col gap-10">
        <Link to="/">
          <div className="h-[200px] w-[160px] bg-slate-500 hover:scale-[1.02]" />
        </Link>
        <Link to="/">
          <div className="h-[200px] w-[160px] bg-slate-400 hover:scale-[1.02]" />
        </Link>
        <Link to="/">
          <div className="h-[200px] w-[160px] bg-slate-300 hover:scale-[1.02]" />
        </Link>
      </div>
    </div>
  )
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
    <div className="flex h-full w-full flex-col items-center">
      <div className="mt-10 flex h-full w-full justify-center">
        <div className="flex justify-center gap-10">
          <Refinements />
          <Results hits={hits} />
          <HotComics />
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
