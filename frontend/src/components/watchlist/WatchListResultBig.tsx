import { Button, Text } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import {useState}  from "react"
import {  AmplifyS3Image } from "@aws-amplify/ui-react/legacy"
import { WatchList } from "../../models"
import { DataStore } from "@aws-amplify/datastore"

type Issue = {
    id: string | null | undefined
    issue_id: string | null | undefined
    title_name: string | null | undefined
    issue_num: string | null | undefined
    publisher_name: string | null | undefined
    cpg_id: string | null | undefined
    removeFromWatchlist:any 
  }
export default function WatchListResultBig({
  id, 
  issue_id,
  title_name, 
  issue_num, 
  publisher_name, 
  cpg_id, 
  removeFromWatchlist}: Issue
  ) {
    
    function imgError(evt: any) {
      evt.target.src='/no-image.svg';
    }


    return ( 
            
      <div className="flex flex-wrap p-8 w-1/3 justify-center">
        <div className=" w-60 mx-4 md:p-6 rounded bg-container-outer text-center b4">
          <Link to={`/details/${issue_id}`}>
            <div className='h-48 my-auto'>
            <AmplifyS3Image 
                    handleOnError = { imgError }
                    imgProps={ {'style': {'objectFit':'contain', 'height':'100%', 'width':'8rem'} }}  
                    imgKey={`issues/${cpg_id?.replace('/', '-')}`} 
            />
            </div>
          </Link>
          {/* <img alt="gallery" class="block object-cover object-center w-full h-full rounded-lg"
            src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(74).webp"> */}

            <p className="text-lg font-semibold">{`${title_name} - #${issue_num}`}</p>
            <p className="">{publisher_name} | Issue # {issue_num}  </p>
            <button onClick={() => removeFromWatchlist(id)} className="button button-secondary mt-5">Remove</button>
        </div>
      
      </div>
      
        

        // <div className="my-3 flex justify-between gap-3 px-3 py-3 border-t-2 border-solid border-gray-50">
          
        //   <div className="ml-2 flex flex-col mr-auto">
            
        //     {/* <p className="">{publisher_name} | {volume} ({year}) | Issue # {issue_num}  </p>
        //     {issue_comment && age  ? <IssueChips issue_comment={issue_comment} age={age} /> : ''}
        //     {cover_price  ? <p className={cover_price == '' ? 'hidden' : 'mt-20'} >Cover Price: ${parseFloat(cover_price).toFixed(2)}</p> : ''}
        //     {cover_price  ? <p className={cover_price == '' ? 'hidden' : 'mt-20'} >Current Price: ${parseFloat(cover_price).toFixed(2)}</p> : ''} */}
        //   </div>   
        //   <div className="flex flex-col justify-between">
        //       <div className="ml-auto text-right">
        //         <ManageWatchList data={watchListData} />
        //       </div>
        //       <div>
        //         <Link to={`/details/${id}`} className="button button-secondary">View Issue</Link>
        //       </div>
        //   </div>
        // </div>
    )
  }
  