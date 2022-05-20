import { useParams } from "react-router-dom"
import { AutoSizer } from "react-virtualized"
import useSWR from "swr"
import { Line } from "@nivo/line"

import RelatedIssues from "components/issue-details/RelatedIssues"
import { getIssueImage } from "utils/imagePath"

type IssueDetailsData = {
  id: string
  title_id: string
  publisher_id: string
  issue_name: string
  title_name: string
  publisher_name: string
  volume: string | null
  comment: string | null
  publication_month: number | null
  publication_year: number | null
}

export default function IssueDetails() {
  const { issueId } = useParams<{ issueId: string }>()
  const { data: issue, error } = useSWR<IssueDetailsData>(`https://api.comicsprice.guide/api/issue/${issueId}`)

  if (error) {
    return <div>{error.toString()}</div>
  }

  if (!issue) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex w-full flex-col space-y-10 p-10">
      <MainDetails issue={issue} />
      <RelatedIssues issueId={issue.id} />
    </div>
  )
}

function MainDetails({ issue }: { issue: IssueDetailsData }) {
  const full_issue_name = `${issue.title_name} #${issue.issue_name}`
  const metadata = [
    issue.publisher_name,
    issue.title_name,
    issue.volume,
    issue.publication_year,
  ].filter((m) => Boolean(m))

  return (
    <div className="flex w-full flex-row items-stretch space-x-10">
      <img
        className="max-h-[60vh] object-contain"
        alt={full_issue_name}
        src={getIssueImage(issue.id)}
      />
      <div className="flex grow flex-col space-y-5">
        <div className="text-3xl">{full_issue_name}</div>
        <div className="text-sm">{metadata.join(" | ")}</div>
        {issue.comment && (
          <div className="w-full p-2 text-sm outline outline-1">{issue.comment}</div>
        )}
        <Graphs id={issue.id} />
      </div>
    </div>
  )
}

function Graphs({ id }: { id: string }) {
  return (
    <div className="flex grow items-stretch gap-5 sm:flex-col md:flex-row">
      <div className="grow outline outline-1">
        <PriceGraph id={id} />
      </div>
    </div>
  )
}

type Price = {
  date: string
  price: string
  grade: string
}

function PriceGraph({ id }: { id: string }) {
  const { data: prices } = useSWR<Price[]>(`/api/issue/${id}/prices`)

  if (!prices) {
    return <div>loading</div>
  }

  const data = bucket(prices)

  return (
    <AutoSizer>
      {({ width, height }) => (
        <Line
          width={width}
          height={height}
          data={data}
          curve="catmullRom"
          margin={{
            top: 20,
            bottom: 50,
            right: 20,
            left: 50,
          }}
          xScale={{ type: "time", format: "%Y-%m-%d" }}
          xFormat="time:%Y-%m-%d"
          axisBottom={{
            format: "%Y-%m",
            tickRotation: -45,
          }}
          yScale={{
            type: "linear",
            reverse: false,
          }}
          yFormat=".2f"
          axisLeft={{
            legend: "Price (USD)",
            legendOffset: -40,
            legendPosition: "middle",
          }}
          pointSize={10}
          tooltip={(p: any) => (
            <div className="flex flex-col items-stretch justify-center rounded border bg-white p-2 text-xs">
              <div className="whitespace-nowrap">
                <span className="font-bold">Date</span>: {p.point.data.x.toDateString()}
              </div>
              <div className="whitespace-nowrap">
                <span className="font-bold">Price</span>: ${p.point.data.y.toFixed(2)}
              </div>
              <div className="whitespace-nowrap">
                <span className="font-bold">Grade</span>: {p.point.data.grade}
              </div>
            </div>
          )}
          useMesh={true}
          legends={[
            {
              anchor: "bottom-right",
              direction: "column",
              itemWidth: 80,
              itemHeight: 20,
              symbolShape: "circle",
              symbolSize: 10,
            },
          ]}
        />
      )}
    </AutoSizer>
  )
}

// bucket prices into high, medium, and low quality buckets, returning an array that can be passed to a nivo graph
function bucket(prices: Price[]) {
  const high = []
  const med = []
  const low = []

  for (const p of prices) {
    const grade = Number(p.grade)
    if (grade > 8) {
      high.push(p)
    } else if (grade > 4) {
      med.push(p)
    } else {
      low.push(p)
    }
  }

  return [
    {
      id: "Low Quality",
      data: nivoize(low),
    },
    {
      id: "Medium Quality",
      data: nivoize(med),
    },
    {
      id: "High Quality",
      data: nivoize(high),
    },
  ]
}

function nivoize(prices: Price[]) {
  return prices.map(({ date, price, grade }) => ({ x: date.slice(0, 10), y: price, grade }))
}
