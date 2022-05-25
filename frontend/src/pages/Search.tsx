import algoliasearch from "algoliasearch/lite"
import { SearchResults } from "algoliasearch-helper"
import { useContext } from "react"
import { Link } from "react-router-dom"
import {
  Configure,
  InstantSearch,
  RefinementList,
  useHits,
  useRefinementList,
  useSearchBox,
} from "react-instantsearch-hooks-web"
import useSWR from "swr"

import { NavBarContext } from "components/common/NavBar"
import { getIssueImage } from "utils/imagePath"
import { IssueMinimal, IssueFull } from "types/api"

const INDEX_NAME = "tmp-index"
const HITS_PER_PAGE = 7
const REFINEMENT_LIST_LIMIT = 16

const searchClient = algoliasearch("SGT5R38GFV", "30905cb33c45654eb5159c7f1197bb43")

type RefinementProps = {
  title: string
  attribute: string
}

type ChipsProps = {
  age: string
  comment: string | null
}

type ResultProps = IssueFull

type ResultsProps = {
  hits: IssueFull[]
  results: SearchResults<IssueFull>
}

type IssueProps = IssueMinimal

function Refinement({ attribute, title }: RefinementProps) {
  const { items, refine } = useRefinementList({ attribute, sortBy: ["name:asc"] })

  return (
    <div className="flex flex-col">
      <p className="text-lg font-bold text-common-text">{title}</p>
      {items.map(({ value, count, isRefined }) =>
        <div key={value} className="flex gap-2 items-center">
          <input
            id={`refine-${value}`}
            type="checkbox"
            checked={isRefined}
            className="border-2 border-common-text bg-container-outer"
            onChange={() => refine(value)}
          />
          <label htmlFor={`refine-${value}`} className="text-common-text">{`${value} (${count})`}</label>
        </div>
      )}
    </div>
  )
}

function PriceRange() {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-lg font-bold text-common-text">Price Range</p>
    </div>
  )
}

function Chips({ comment, age }: ChipsProps) {
  return (
    <div className="flex w-full gap-2 text-xs">
      {comment && <div className="rounded bg-key-issue py-1 px-2 mt-1">Key Issue</div>}
      <div className={`rounded bg-${age.toLowerCase()}-age py-1 px-2 mt-1`}>{age} Age</div>
    </div>
  )
}

function Result({ id, title, issue: issueTitle, publisher, volume, age, comment }: ResultProps) {
  const volumeText = volume ? `${volume} | ` : ""

  return (
    <Link to={`/details/${id}`}>
      <div className="flex w-[500px] gap-3 px-3 py-3 text-common-text">
        <img src={getIssueImage(id)} alt="" className="h-auto w-[80px]" />
        <div className="mt-2 flex flex-col">
          <p className="font-extrabold">{`${title} - #${issueTitle}`}</p>
          <p className="text-xs">{`${publisher} | ${volumeText}Issue #${issueTitle}`}</p>
          <Chips comment={comment} age={age}/>
        </div>
      </div>
    </Link>
  )
}

function Refinements() {
  return (
    <div className="flex flex-col gap-5 bg-container-outer p-10 rounded-md">
      <p className="font-bold text-2xl text-common-text">Filter by</p>
      <Refinement title="Comic Age" attribute="age" />
      <Refinement title="Publisher" attribute="publisher" />
    </div>
  )
}

function Results({ hits, results }: ResultsProps) {
  // TODO: same outer div as refinements and hotcomics
  return (
    <div className="flex flex-col gap-5 bg-container-outer p-10 rounded-md">
      <p className="text-xl font-extrabold text-common-text">{`${results.nbHits} Results`}</p>
      <div className="flex flex-col border-y-2 border-list-line divide-y-2 divide-list-line">
        {hits.map((hit) =>
          <Result key={hit.id} {...hit} />
        )}
      </div>
    </div>
  )
}

function Issue({ id, issue, title, publisher }: IssueProps) {
  return (
    <div className="flex w-32 flex-col items-center">
      <div className="h-40 w-32">
        <img
          className="h-full w-full object-contain"
          alt={`${title} #${issue}`}
          src={getIssueImage(id)}
        />
      </div>
      <div className="pt-3 text-center text-xs font-semibold text-common-text">{title}</div>
      <div className="text-xxs text-common-text">Issue #{issue}</div>
      <div className="text-xxs text-common-text">{publisher}</div>
    </div>
  )
}

function HotComics() {
  const { data: issues } = useSWR<IssueMinimal[]>("/api/issue/popular")

  if (!issues) {
    return <div>loading</div>
  }

  return (
    <div className="flex flex-col gap-3 bg-container-outer p-10 rounded-md items-center">
      <p className="text-xl font-extrabold text-common-text">Hot Comics</p>
      <div className="flex flex-col gap-10">
        {issues.slice(0, 3).map(({ id, issue, title, publisher }) =>
          <Link key={id} to={`/details/${id}`}>
            <Issue id={id} issue={issue} title={title} publisher={publisher} />
          </Link>
        )}
      </div>
    </div>
  )
}

function Page() {
  const { clear, refine } = useSearchBox()
  const { text: navBarText } = useContext(NavBarContext)
  const { hits, results } = useHits<IssueFull>()

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
          <Results hits={hits} results={results!} />
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
