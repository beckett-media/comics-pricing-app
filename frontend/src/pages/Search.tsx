import algoliasearch from "algoliasearch/lite"
import { useContext } from "react"
import { Link, useSearchParams } from "react-router-dom"
import {
  Configure,
  Hits,
  InstantSearch,
  RefinementList,
  ToggleRefinement,
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

type ToggleRefinementListProps = {
  title: string
  toggleConfigs: { label: string; attribute: string }[]
}

type HitProps = {
  hit: {
    issue_id: string
    title_name: string
    issue_name: string
    publisher_name: string
  }
}

function Refinement({ attribute, title }: RefinementProps) {
  return (
    <div className="flex flex-col">
      <p className="text-lg font-bold uppercase">{title}</p>
      <RefinementList
        attribute={attribute}
        limit={REFINEMENT_LIST_LIMIT}
        classNames={{
          label: "flex gap-2 items-center",
          labelText: "font-bold",
          count: "text-slate-500",
        }}
      />
    </div>
  )
}

function ToggleRefinementList({ title, toggleConfigs }: ToggleRefinementListProps) {
  return (
    <div className="flex flex-col">
      <p className="text-lg font-bold uppercase">{title}</p>
      {toggleConfigs.map((toggleConfig, idx) => (
        <ToggleRefinement
          key={idx}
          attribute={toggleConfig.attribute}
          label={toggleConfig.label}
          classNames={{
            label: "flex gap-2 items-center",
            labelText: "font-bold",
          }}
        />
      ))}
    </div>
  )
}

function Hit({ hit: { issue_id, title_name, issue_name, publisher_name } }: HitProps) {
  return (
    <Link to={`/details/${issue_id}`}>
      <div className="my-3 flex w-[500px] gap-3 bg-slate-200 px-3 py-3 hover:scale-[1.02]">
        <img src={getIssueImage(issue_id)} alt="" className="h-auto w-[80px]" />
        <div className="mt-2 flex flex-col">
          <p className="font-bold">{`${title_name} - #${issue_name}`}</p>
          <p className="text-xs uppercase">{publisher_name}</p>
        </div>
      </div>
    </Link>
  )
}

function Page() {
  const { clear, refine } = useSearchBox()
  const { text: query } = useContext(NavBarContext)
  const [searchParams] = useSearchParams()

  if (query) {
    refine(query)
  } else {
    const searchedQuery = searchParams.get("q")

    if (searchedQuery) {
      refine(searchedQuery)
    } else {
      clear()
    }
  }

  return (
    <div className="flex h-full w-full flex-col items-center">
      <div className="mt-10 flex h-full w-full justify-center">
        <div className="flex justify-center gap-10">
          <div className="flex flex-col gap-5">
            <Refinement title="Publisher" attribute="publisher_name" />
            <Refinement title="Title" attribute="title_name" />
            <ToggleRefinementList
              title="Other"
              toggleConfigs={[{ label: "From Imprint", attribute: "from_imprint" }]}
            />
          </div>

          <div className="flex flex-col">
            <p className="text-xl font-extrabold uppercase">Results</p>
            <Hits hitComponent={Hit} />
          </div>

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
        </div>
      </div>
    </div>
  )
}

export default function Search() {
  return (
    <div className="flex h-full w-full items-center justify-center gap-10">
      <InstantSearch searchClient={searchClient} indexName={INDEX_NAME}>
        <Configure hitsPerPage={HITS_PER_PAGE} />
        <Page />
      </InstantSearch>
    </div>
  )
}
