import useSWR from "swr"
import React from "react"
import Issue from "components/common/Issue"
import type { IssueMinimal } from "types/api"
import { Auth, Analytics } from "aws-amplify"
import { ResponsiveLine } from '@nivo/line';
type SalesTickerProps = {
  data: any
}

export default function SalesTicker({ data }: SalesTickerProps) {

  return (
  

    <ResponsiveLine
      data={data}
      // margin={{
      //   top: 50,
      //   right: 110,
      //   bottom: 50,
      //   left: 60
      // }}
      axisBottom={
        undefined
      }
      axisLeft={
        undefined
      }
      xScale={{
        type: 'point'
      }}
      yScale={{
        type: 'linear',
        stacked: true,
        min: 'auto',
        max: 'auto'
      }}
      curve="basis"
      pointSize={0}
      colors={{ scheme: 'blues' }}
      enableArea={true}
      theme={{
        textColor: "#FFFFFF",
        
        axis: {
          ticks: {
            line: {
              stroke: "#FFFFFF",
              strokeWidth: 0,
            },
            text:{
              fontSize:0
            }
          },
          domain: {
            line: {
              stroke: "#FFFFFF",
              strokeWidth: 0,
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
  )
}


