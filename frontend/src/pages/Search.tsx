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
    <div className="bg-slate-300 w-[100px] h-[30px] flex items-center justify-center">
      <i className="fa-solid fa-magnifying-glass text-white" />
    </div>
  )
}

function Refinement(props: RefinementProps) {
  return (
    <div className="flex flex-col">
      <p className="font-bold text-lg uppercase">{props.title}</p>
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
      <p className="font-bold text-lg uppercase">{props.title}</p>
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
      <div className="bg-slate-200 w-[500px] flex my-3 px-3 py-3 gap-3 hover:scale-[1.02]">
        <img src={imgSrc} alt="" className="w-[80px] h-auto" />
        <div className="flex flex-col mt-2">
          <p className="font-bold">{`${hit.title_name} - #${hit.issue_name}`}</p>
          <p className="uppercase text-xs">{hit.publisher_name}</p>
        </div>
      </div>
    </a>
  )
}

export default function Search() {
  return (
    <div className="absolute flex h-full w-full items-center justify-center gap-10">
      <InstantSearch searchClient={searchClient} indexName={INDEX_NAME}>
        <Configure hitsPerPage={HITS_PER_PAGE} />
        <div className="flex flex-col items-center w-full h-full">
          <div className="flex bg-slate-200 gap-5 py-10 px-32 w-full justify-between">
            <div className="font-extrabold uppercase text-xl">Comic Surge</div>
            <SearchBox
              placeholder={PLACEHOLDER}
              classNames={{ input: "px-3 border-slate-300 border-2 w-[200px] h-[30px]" }}
              submitIconComponent={SubmitIcon}
              resetIconComponent={() => <></>}
            />
          </div>

          <div className="w-full h-full flex justify-center m-20">
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
                <p className="font-extrabold text-xl uppercase">Results</p>
                <Hits hitComponent={Hit} />
              </div>

              <div className="flex flex-col gap-3 ml-20">
                <p className="font-extrabold text-xl uppercase">Hot Comics</p>
                <div className="flex flex-col gap-10">
                  <a href="/">
                    <div className="bg-slate-500 w-[160px] h-[200px] hover:scale-[1.02]" />
                  </a>
                  <a href="/">
                    <div className="bg-slate-400 w-[160px] h-[200px] hover:scale-[1.02]" />
                  </a>
                  <a href="/">
                    <div className="bg-slate-300 w-[160px] h-[200px] hover:scale-[1.02]" />
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
