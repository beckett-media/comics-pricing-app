import Result from "./Result"


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

type ResultsProps = {
    hits: Issue[]
  }
  
  
  
export default function Results({ hits }: ResultsProps) {
    console.log('hits', hits)
    return (
      <div className="flex w-full flex-col rounded bg-container-outer p-7 text-common-text">
        <p className="text-xl">Results</p>
        {hits.map((hit) => (
          <Result key={hit.id} {...hit} />
        ))}
      </div>
    )
  }
  