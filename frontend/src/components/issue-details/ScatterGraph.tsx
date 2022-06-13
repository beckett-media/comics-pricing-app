import useSWR from "swr"
import { ScatterPlot } from "@nivo/scatterplot"
import { AutoSizer } from "react-virtualized"
import * as React from "react"
import { API } from "aws-amplify"
import type { Price } from "types/api"

export default function ScatterGraph({ id }: { id: string }) {
  // const { data: prices } = useSWR<Price[]>(`/api/issue/${id}/prices`)

  const [prices, setData] = React.useState<Price[]>()
  const [error, setError] = React.useState<any>()

  const apiName = "comicsapi"
  const path = `/api/issue/'${id}'/prices`
  const myInit = {
    // OPTIONAL
    response: true, // OPTIONAL (return the entire Axios response object instead of only response.data)
  }

  React.useEffect(() => {
    API.get(apiName, path, myInit)
      .then((response) => {
        // Add your code here
        setData(response?.data.rows)

      })
      .catch((error) => {
        console.log(error.response)
        setError(error)
      })
  }, [id])

  if (!prices) {
    return <div>loading</div>
  }

  const data = bucket(prices)

  return (
    <div className="flex flex-col w-full h-full px-5 py-4">
      <div className="w-full text-sm text-center">Prices by Grade</div>
      <div className="min-w-0 grow">
        <AutoSizer>
          {({ width, height }) => (
            <ScatterPlot
              width={width}
              height={height}
              data={data}
              margin={{
                top: 20,
                bottom: 65,
                right: 10,
                left: 30,
              }}
              xScale={{
                min: 0,
                max: 10,
                type: "linear",
                reverse: false,
              }}
              xFormat=".1f"
              yScale={{
                min: "auto",
                max: "auto",
                type: "linear",
                reverse: false,
              }}
              axisLeft={{
                tickValues: 6,
              }}
              yFormat=".2f"
              tooltip={(p: any) => (
                <div className="flex flex-col items-stretch justify-center p-2 text-xs text-black bg-white border rounded">
                  <div className="whitespace-nowrap">
                    <span className="font-bold">Date</span>: {p?.node?.data?.date}
                  </div>
                  <div className="whitespace-nowrap">
                    <span className="font-bold">Grade</span>: {p?.node?.data?.x?.toFixed(1)}
                  </div>
                  <div className="whitespace-nowrap">
                    <span className="font-bold">Price</span>: ${p?.node?.data?.y?.toFixed(2)}
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
                  symbolSize: 5,
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
      high?.push(p)
    } else if (grade > 4) {
      med?.push(p)
    } else if (grade >= 0) {
      low?.push(p)
    }
  }

  return [
    {
      id: "Poor",
      data: nivoize(low),
    },
    {
      id: "Good",
      data: nivoize(med),
    },
    {
      id: "Mint",
      data: nivoize(high),
    },
  ]
}

function nivoize(prices: Price[]) {
  return prices?.map(({ date, price, grade }) => ({
    x: Number(grade),
    y: price,
    date: new Date(date).toDateString(),
  }))
}
