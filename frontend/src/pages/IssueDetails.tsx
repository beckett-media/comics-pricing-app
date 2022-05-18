import { useParams } from "react-router-dom"
import useSWR from "swr"
import { ResponsiveLine } from "@nivo/line"

import RelatedIssues from "components/issue-details/RelatedIssues"
import { getIssueImage } from "utils/imagePath"

type IssueDetailsData = {
  id: string
  title_id: string
  publisher_id: string
  issue_name: string
  title_name: string
  publisher_name: string
  publication_month: number | null
  publication_year: number | null
}

export default function IssueDetails() {
  const { issueId } = useParams<{ issueId: string }>()
  const { data: issue, error } = useSWR<IssueDetailsData>(`/api/issue/${issueId}`)

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

  return (
    <div className="flex w-full flex-row space-x-10 items-stretch">
      <img
        className="max-h-[60vh] object-contain"
        alt={full_issue_name}
        src={getIssueImage(issue.id)}
      />
      <div className="flex grow flex-col space-y-5">
        <div className="text-3xl">{full_issue_name}</div>
        <div className="text-sm">
          {issue.publisher_name} | {issue.title_name} | {issue.publication_year}
        </div>
        <div className="w-full p-2 text-sm outline outline-1">
          Details: First appearance of Luke Skywalker, Darth Vader, Princess Leia, Obi-Wan Kenobi,
          C-3PO, and R2-D2
        </div>
        <Graphs />
      </div>
    </div>
  )
}

function Graphs() {
  return (
    <div className="grow flex md:flex-row sm:flex-col gap-5 items-stretch">
      <div className="grow outline outline-1">
        <PriceGraph />
      </div>
      <div className="grow outline outline-1">Scatter Graph</div>
    </div>
  )
}

const data = [
  {
    id: "japan",
    color: "hsl(99, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 187,
      },
      {
        x: "helicopter",
        y: 120,
      },
      {
        x: "boat",
        y: 232,
      },
      {
        x: "train",
        y: 84,
      },
      {
        x: "subway",
        y: 235,
      },
      {
        x: "bus",
        y: 299,
      },
      {
        x: "car",
        y: 235,
      },
      {
        x: "moto",
        y: 96,
      },
      {
        x: "bicycle",
        y: 261,
      },
      {
        x: "horse",
        y: 86,
      },
      {
        x: "skateboard",
        y: 28,
      },
      {
        x: "others",
        y: 236,
      },
    ],
  },
]

function PriceGraph() {
  return (
    <ResponsiveLine
      data={data}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      yFormat=" >-.2f"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "transportation",
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "count",
        legendOffset: -40,
        legendPosition: "middle",
      }}
      pointSize={10}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  )
}
