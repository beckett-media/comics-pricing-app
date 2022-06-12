import {
    Configure,
    InstantSearch,
    RefinementList,
    useHits,
    useSearchBox,
  } from "react-instantsearch-hooks-web"
  
type RefinementProps = {
    title: string
    attribute: string
  }

const REFINEMENT_LIST_LIMIT = 16

export default function Refinement({ attribute, title }: RefinementProps) {
    return (
      <div className="flex flex-col">
        <p className="text-lg">{title}</p>
        <RefinementList
          attribute={attribute}
          limit={REFINEMENT_LIST_LIMIT}
          sortBy={["name:asc"]}
          classNames={{
            label: "flex gap-2 items-center",
            labelText: "",
            count: "text-slate-500",
          }}
        />
      </div>
    )
  }
  