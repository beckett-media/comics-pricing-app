import useSWR from "swr"
import { Line } from "@nivo/line"
import { AutoSizer } from "react-virtualized"
import * as React from "react"
import type { Price } from "types/api"
import { API } from "aws-amplify"

export default function PriceGraph({ id }: { id: string }) {
  // const { data: prices } = useSWR<Price[]>(`/api/issue/${id}/prices`)

  const [prices, setPrices] = React.useState<Price[]>()
  const [error, setError] = React.useState<any>()
  const [loading, setLoading] = React.useState(true)

  const apiName = "comicsapi"
  const path = `/api/issue/'${id}'/prices`
  const myInit = {
    // OPTIONAL
    response: true, // OPTIONAL (return the entire Axios response object instead of only response.data)
  }

  React.useEffect(() => {
    setLoading(true);
    API.get(apiName, path, myInit)
      .then((response) => {
        // Add your code here
        setPrices(response.data.rows);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.response)
        setError(error)
        setLoading(false);
      })
  }, [id])

  if (!prices) {
    return <div>loading</div>
  }

  const data = bucket(prices)
  

  return (
    <div className="flex flex-col w-full h-full px-5 py-4">
      <div className="w-full text-sm text-center">Prices Over Time</div>
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
                min: "auto",
                max: "auto",
                type: "linear",
                reverse: false,
              }}
              axisLeft={{
                tickValues: 6,
              }}
              yFormat=".2f"
              pointSize={5}
              tooltip={(p: any) => (
                <div className="flex flex-col items-stretch justify-center p-2 text-xs text-black bg-white border rounded">
                  <div className="whitespace-nowrap">
                    <span className="font-bold">Date</span>: {p.point?.data?.x.toDateString()}
                  </div>
                  <div className="whitespace-nowrap">
                    <span className="font-bold">Price</span>: ${p?.point?.data?.y?.toFixed(2)}
                  </div>
                  <div className="whitespace-nowrap">
                    <span className="font-bold">Grade</span>: {p?.point?.data?.grade}
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
    const grade = Number(p?.grade)
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
  return prices?.map(({ date, price, grade }) => ({ x: date?.slice(0, 10), y: price, grade }))
}
