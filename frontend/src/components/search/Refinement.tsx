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

export function Refinement({ attribute, title }: RefinementProps) {
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

export function RefinementEra( { attribute, title }: RefinementProps ) {
  console.log("RefinementEra");
    return (
      <div className="flex flex-col">
      <p className="text-lg">{title}</p>
      <RefinementList
        attribute={attribute}
        limit={REFINEMENT_LIST_LIMIT}
        sortBy={(a,b) => sortEra(a.name, b.name)}
        classNames={{
          label: "flex gap-2 items-center",
          labelText: "",
          count: "text-slate-500",
        }}
      />
      </div>
    )
}

function sortEra(A: string, B: string) {
  const eraDict = {
    "Modern": 1,
    "Copper": 2,
    "Bronze": 3,
    "Silver": 4,
    "Gold": 5
  }
  return eraDict[A as keyof typeof eraDict] - eraDict[B as keyof typeof eraDict];
}
