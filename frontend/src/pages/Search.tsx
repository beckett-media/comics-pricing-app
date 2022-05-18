import algoliasearch from "algoliasearch/lite"
import {
  Configure,
  Hits,
  InstantSearch,
  RefinementList,
  SearchBox,
  ToggleRefinement,
} from "react-instantsearch-hooks-web"

const INDEX_NAME = "tmp-index"
const HITS_PER_PAGE = 7
const PLACEHOLDER = "Test"
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

function SubmitIcon() {
  return (
    <div className="flex h-[30px] w-[100px] items-center justify-center bg-slate-300">
      <i className="fa-solid fa-magnifying-glass text-white" />
    </div>
  )
}

function Refinement(props: RefinementProps) {
  return (
    <div className="flex flex-col">
      <p className="text-lg font-bold uppercase">{props.title}</p>
      <RefinementList
        attribute={props.attribute}
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

function ToggleRefinementList(props: ToggleRefinementListProps) {
  return (
    <div className="flex flex-col">
      <p className="text-lg font-bold uppercase">{props.title}</p>
      {props.toggleConfigs.map((toggleConfig, idx) => (
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

function Hit({ hit }: any) {
  const imgSrc = `https://comics-scans.s3.amazonaws.com/issues/${hit.issue_id}`

  return (
    <a href={`/details/${hit.issue_id}`}>
      <div className="my-3 flex w-[500px] gap-3 bg-slate-200 px-3 py-3 hover:scale-[1.02]">
        <img src={imgSrc} alt="" className="h-auto w-[80px]" />
        <div className="mt-2 flex flex-col">
          <p className="font-bold">{`${hit.title_name} - #${hit.issue_name}`}</p>
          <p className="text-xs uppercase">{hit.publisher_name}</p>
        </div>
      </div>
    </a>
  )
}

export default function Search() {
  return (
    <div className="flex h-full w-full items-center justify-center gap-10">
      <InstantSearch searchClient={searchClient} indexName={INDEX_NAME}>
        <Configure hitsPerPage={HITS_PER_PAGE} />
        <div className="flex h-full w-full flex-col items-center">
          <div className="flex w-full justify-between gap-5 bg-slate-200 py-10 px-32">
            <div className="text-xl font-extrabold uppercase">Comic Surge</div>
            <SearchBox
              placeholder={PLACEHOLDER}
              classNames={{ input: "px-3 border-slate-300 border-2 w-[200px] h-[30px]" }}
              submitIconComponent={SubmitIcon}
              resetIconComponent={() => <></>}
            />
          </div>

          <div className="m-20 flex h-full w-full justify-center">
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
                  <a href="/">
                    <div className="h-[200px] w-[160px] bg-slate-500 hover:scale-[1.02]" />
                  </a>
                  <a href="/">
                    <div className="h-[200px] w-[160px] bg-slate-400 hover:scale-[1.02]" />
                  </a>
                  <a href="/">
                    <div className="h-[200px] w-[160px] bg-slate-300 hover:scale-[1.02]" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </InstantSearch>
    </div>
  )
}
