import { Link } from "react-router-dom"
import {  AmplifyS3Image } from "@aws-amplify/ui-react/legacy"
import IssueChips from "components/common/IssueChips"
import ManageWatchList from "components/watchlist/ManageWatchList"

type Issue = {
    id: string | null | undefined
    title_name: string | null | undefined
    issue_num: string | null | undefined
    publisher_name: string | null | undefined
    cpg_id: string | null | undefined
    volume: string | null | undefined
    year: string | null | undefined
    cover_price:string | null | undefined
    issue_comment:string | null | undefined
    age:string | null | undefined
  }
export default function Result({ id, 
  title_name, 
  issue_num, 
  publisher_name, 
  cpg_id, 
  volume, 
  year,
  cover_price,
  issue_comment ,
  age}: Issue) {

    const watchListData = {
      'imageId': cpg_id,
      'issueId': id,
      'publisher': publisher_name,
      'name': title_name,
      'issue': issue_num,
    }
    function imgError(evt: any) {
      evt.target.src='/no-image.svg';
    }

      
    return ( 
        <div className="my-3 flex justify-between gap-3 px-3 py-3 border-t-2 border-solid border-gray-50">
          <Link to={`/details/${id}`}>
            <div className='h-48 my-auto'>
                <AmplifyS3Image 
                    handleOnError = { imgError }
                    imgProps={ {'style': {'objectFit':'contain', 'height':'100%', 'width':'8rem'} }}  
                    imgKey={`issues/${cpg_id?.replace('/', '-')}`} 
                  />
            </div>
          </Link>
          <div className="ml-2 flex flex-col mr-auto">
            <p className="text-lg font-semibold">{`${title_name} - #${issue_num}`}</p>
            <p className="">{publisher_name} | {volume} ({year}) | Issue # {issue_num}  </p>
            {issue_comment && age  ? <IssueChips issue_comment={issue_comment} age={age} /> : ''}
            {cover_price  ? <p className={cover_price == '' ? 'hidden' : 'mt-20'} >Cover Price: ${parseFloat(cover_price).toFixed(2)}</p> : ''}
            {cover_price  ? <p className={cover_price == '' ? 'hidden' : 'mt-20'} >Current Price: ${parseFloat(cover_price).toFixed(2)}</p> : ''}
          </div>   
          <div className="flex flex-col justify-between">
              <div className="ml-auto text-right">
                <ManageWatchList data={watchListData} />
              </div>
              <div>
                <Link to={`/details/${id}`} className="button button-secondary">View Issue</Link>
              </div>
          </div>
        </div>
    )
  }
  