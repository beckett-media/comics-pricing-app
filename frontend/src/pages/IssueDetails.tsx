import { useParams } from "react-router-dom"
import { AutoSizer } from "react-virtualized"
import useSWR from "swr"
import { Line } from "@nivo/line"

import RelatedIssues from "components/issue-details/RelatedIssues"
import { getIssueImage } from "utils/imagePath"
import type { IssueFull, Price } from "types/api"

export default function IssueDetails() {
  const { issueId } = useParams<{ issueId: string }>()
  const { data: issue, error } = useSWR<IssueFull>(`/api/issue/${issueId}`)

  if (error) {
    return <div>{error.toString()}</div>
  }

  if (!issue) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex w-full flex-col space-y-10 py-10 px-24">
      <MainDetails issue={issue} />
      <RelatedIssues issueId={issue.id} />
    </div>
  )
}

function MainDetails({ issue }: { issue: IssueFull }) {
  const metadata = [issue.publisher, issue.volume, `Issue #${issue.issue}`].filter((m) =>
    Boolean(m)
  )

  return (
    <div className="grid w-full grid-cols-2 gap-10 rounded bg-container-outer py-10 px-12 text-common-text">
      <img
        className="w-full object-contain"
        alt={`${issue.title} #${issue.issue}`}
        src={getIssueImage(issue.id)}
      />
      <div className="flex min-w-0 grow flex-col gap-5">
        <div className="text-xl font-bold">{issue.title}</div>
        <div className="text-sm">{metadata.join(" | ")}</div>
        <Chips issue={issue} />
        <Details issue={issue} />
        <Graphs id={issue.id} />
      </div>
    </div>
  )
}

function Chips({}: { issue: IssueFull }) {
  return (
    <div className="flex w-full gap-2 text-xs">
      <div className="rounded bg-key-issue py-1 px-2">Key Issue</div>
      <div className="rounded bg-copper-age py-1 px-2">Copper Age</div>
    </div>
  )
}

function Details({ issue }: { issue: IssueFull }) {
  if (!issue.comment) {
    return null
  }

  return (
    <div className="w-full rounded bg-container-inner py-4 px-5 text-sm">
      <div className="mb-2">
        <span className="font-semibold">Issue Details</span>
      </div>
      <div>{issue.comment}</div>
    </div>
  )
}

function Graphs({ id }: { id: string }) {
  return (
    <div className="h-72 w-full rounded bg-container-inner">
      <PriceGraph id={id} />
    </div>
  )
}

function PriceGraph({ id }: { id: string }) {
  const { data: prices } = useSWR<Price[]>(`/api/issue/${id}/prices`)

  if (!prices) {
    return <div>loading</div>
  }

  const data = bucket(prices)

  return (
    <div className="flex h-full w-full flex-col py-4 px-5">
      <div className="w-full text-center text-sm">Prices Over Time</div>
      <div className="min-w-0 grow">
        <AutoSizer>
          {({ width, height }) => (
            <Line
              width={width}
              height={height}
              data={data}
              curve="catmullRom"
              margin={{
                top: 20,
                bottom: 65,
                right: 5,
                left: 30,
              }}
              xScale={{ type: "time", format: "%Y-%m-%d" }}
              xFormat="time:%Y-%m-%d"
              axisBottom={{
                format: "%Y-%m",
                tickRotation: -45,
                tickValues: 6,
              }}
              yScale={{
                type: "linear",
                reverse: false,
              }}
              yFormat=".2f"
              pointSize={10}
              tooltip={(p: any) => (
                <div className="flex flex-col items-stretch justify-center rounded border bg-white p-2 text-xs text-black">
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
                  anchor: "bottom",
                  direction: "row",
                  itemWidth: 50,
                  itemHeight: 20,
                  symbolShape: "circle",
                  symbolSize: 10,
                  translateY: 65,
                },
              ]}
              theme={{
                textColor: "#FFFFFF",
                axis: {
                  ticks: {
                    line: {
                      stroke: "#FFFFFF",
                      strokeWidth: 1,
                    },
                  },
                  domain: {
                    line: {
                      stroke: "#FFFFFF",
                      strokeWidth: 1,
                    },
                  },
                },
                grid: {
                  line: {
                    stroke: "#FFFFFF",
                    strokeWidth: 0,
                  },
                },
              }}
            />
          )}
        </AutoSizer>
      </div>
    </div>
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
      id: "Mint",
      data: nivoize(high),
    },
    {
      id: "Good",
      data: nivoize(med),
    },
    {
      id: "Poor",
      data: nivoize(low),
    },
  ]
}

function nivoize(prices: Price[]) {
  return prices.map(({ date, price, grade }) => ({ x: date.slice(0, 10), y: price, grade }))
}
