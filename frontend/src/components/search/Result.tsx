import { Link } from "react-router-dom"
import {  AmplifyS3Image } from "@aws-amplify/ui-react/legacy"
import IssueChips from "components/common/IssueChips"
import { ReactComponent as Bookmark } from "assets/bookmark.svg"


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

    function imgError(evt: any) {
        evt.target.src='/Pow.svg';
      }

      
    return (
      <Link to={`/details/${id}`}>
        <div className="my-3 flex justify-between gap-3 px-3 py-3 border-t-2 border-solid border-gray-50">
          
          <div className='h-48 my-auto'>
            <AmplifyS3Image 
                handleOnError = { imgError }
                imgProps={ {'style': {'objectFit':'contain', 'height':'100%', 'width':'8rem'} }}  
                imgKey={`issues/${cpg_id}`} 
              />
          </div>
          
          <div className="ml-2 flex flex-col mr-auto">
            <p className="text-lg font-semibold">{`${title_name} - #${issue_num}`}</p>
            <p className="">{publisher_name} | {volume} ({year}) | Issue # {issue_num}  </p>
            <IssueChips issue_comment={issue_comment} age={age} />
            <p className={cover_price == '' ? 'hidden' : 'mt-20'} >Cover Price: ${parseFloat(cover_price).toFixed(2)}</p>
            <p className={cover_price == '' ? 'hidden' : ''} >Current Price: ${parseFloat(cover_price).toFixed(2)}</p>
          </div>
          
          <div className="flex flex-col justify-between">
              <div className="ml-auto text-right">
                <Bookmark style={{height:35}} />  
              </div>
            
              <div>
                <Link to={`/details/${id}`} className="button button-secondary">View Issue</Link>
              </div>
            
            
          </div>
        </div>
      </Link>
    )
  }
  