import useSWR from "swr"
import React from "react"
import Issue from "components/common/Issue"
import type { IssueMinimal } from "types/api"
import { Auth, Analytics } from "aws-amplify"
import useSalesHistory from "hooks/data/useSalesHistory"
import SalesTicker from "./SalesTicker"
import {  AmplifyS3Image } from "@aws-amplify/ui-react/legacy"
import {Link} from "react-router-dom"

import {truncate} from "../../utils/utils"


type IssueTrendProps = {
  data: any
}

export default function IssueTrend({ data }: IssueTrendProps) {
  const detail_id = data[0]['issue_id'];
  const title = data[0]['title'];
  const start_price = data[0]['price'];
  const end_price = data.at(-1)['price'];
  const price_diff = parseFloat((end_price - start_price).toFixed(2));
  let price_diff_percent = parseFloat(((((end_price - start_price)/start_price)*100)).toFixed(1));
  if( price_diff_percent > 100)
    price_diff_percent = 100;


  const img_id = data[0]['cpg_id'];

  const prices = data?.map(({ date,price }: any, index: any) => {    
      return (
        {
          x: index,
          y:price
        }
      )
  }
  )

  const price_data = [
    {
      "id": "prices",
      "data":prices//.slice(-7)
    }
  ]
  function imgError(evt: any) {
    evt.target.src='/no-image.svg';
  }

  
  return (
    <Link key={detail_id} to={`/details/${detail_id}`}>
    <div className='w-full flex flex-row bg-container-outer p-3 rounded'>
      <div className='h-24'>
        <AmplifyS3Image 
          handleOnError={imgError}
          imgProps={ {'style': {'objectFit':'contain', 'height':'100%', 'max-width':'80px'} }}  
          imgKey={`issues/${img_id?.replace('/', '-')}`} 
        />
      </div>
      <div className='w-full flex flex-col'>
        <div className='ml-2 font-medium'>
            <h3 className="mb-1">{truncate(title, 17)}</h3>
            <h4 className={price_diff> 0 ? 'text-green-600' :'text-red-400'} >
            <div className={price_diff < 0 ? 'fa-solid fa-caret-down' : 'fa-solid fa-caret-up'}></div>
            {price_diff> 0 ? '+' :''}${price_diff.toFixed(2)} ({price_diff> 0 ? '+' :''}{price_diff_percent}%)
            </h4>
        </div>
        <div className='w-40 ml-2 h-full'>
          <SalesTicker data={price_data}/>    
        </div>
      </div>
    </div>
    </Link>
  )
}



