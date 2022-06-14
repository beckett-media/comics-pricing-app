import { WatchList } from "../models"
import { DataStore } from "@aws-amplify/datastore"
import { useEffect, useState, useContext } from "react"
import { Link } from "react-router-dom"
import { NavBarContext } from "components/common/NavBar"
import RecentlyViewedBig from "components/recently-viewed/RecentlyViewedBig"
import { useToast } from '@chakra-ui/react'
import { RecentlyView } from "../models"

  
export default function RecentlyViewedMain() {
  const toast = useToast()

  const [recentlyView, setRecentlyView] = useState<RecentlyView[]>([])
  const [isLoading, setIsLoading] = useState(true)

  async function getRecentlyView() {
    const models = await DataStore.query(RecentlyView)
    const uniqueModels = [...new Map(models.map(item =>
      [item['issueId'], item])).values()];
    ;
    setRecentlyView(uniqueModels);
    setIsLoading(false)
    return uniqueModels
  }

  useEffect(() => {
    getRecentlyView().then(setRecentlyView)
  }, [isLoading])

  return (
  
      <div className="flex flex-wrap -m-1 md:-m-2 py-8 ">
       {recentlyView.map(({id, issueId, imageId, publisher, name, issue}) => (
            
            <RecentlyViewedBig 
              key={id} 
              id={id}
              issueId={issueId} 
              imageId={imageId} 
              publisher={publisher}
              name={name}
              issue={issue} 
                />
        ))}
      </div>
    


  
  //   <div className="flex flex-wrap space-x-2 items-center">
  //     <div className="mt-10 flex w-full">
  //       <div className="flex w-full gap-10">
          
  //         <div className="flex w-full flex-col rounded bg-container-outer p-7 text-common-text">
  //           <p className="text-xl">3 Results</p>
  //           <div>
                
              
  //               {/* <div className='w-full text-xl text-center'>No mathing results found.</div> */}
                
  //             </div> 

  //           </div>
  //       </div>
  //    </div>
  // </div>    
  
  )
}


