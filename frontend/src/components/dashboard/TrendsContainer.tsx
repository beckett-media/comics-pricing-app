import useSWR from "swr"
import * as React from "react"
import GalleryScroll from "./GalleryScroll"
import Publisher from "./Publisher"
import type { Publisher as PublisherData } from "types/api"
import { API } from "aws-amplify"
import useSalesHistory from "hooks/data/useSalesHistory"
import IssueTrend from "components/issue-trends/IssueTrend"

export default function TrendsContainer() {
  const { data: issues, isLoading, isError } = useSalesHistory()
  
  if (!issues) {
    return <div>loading</div>
  }

  let groupedData = issues?.reduce((state: any,current: any) => {
    let {ix} = current;
    
    let rec = state[ix] || (state[ix] = []);
    rec.push(current);    
    return state;
 }, {});
 
  let listData = Object.entries(groupedData)
  
  if (isLoading) {
    return <div>loading</div>
  }

  console.log(listData?.slice(6));
  

  return (
    <div className="flex flex-row w-full space-x-2 justify-between overflow-x-auto">

      {listData?.slice(5).map((objData: any) => (
        <IssueTrend data={objData[1].slice(-10)}/>
      ))}
     
    </div>
    
  )
}