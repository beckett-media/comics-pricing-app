import { WatchList } from "../models"
import { DataStore } from "@aws-amplify/datastore"
import { useEffect, useState, useContext } from "react"
import { Link } from "react-router-dom"
import { NavBarContext } from "components/common/NavBar"
import WatchListResultBig from "components/watchlist/WatchListResultBig"
import { useToast } from '@chakra-ui/react'

import {ReactComponent as Image} from '../assets/empty.svg'


type Issue = {
  id: string
  issue_id: string
  title_name: string
  issue_num: string
  publisher_name: string
  cpg_id: string
  // volume: string
  // year: string
  // cover_price:string
  // issue_comment:string
  // age:string
}

export default function WatchListMain() {
  const toast = useToast()

  const [watchlist, setWatchlist] = useState<WatchList[]>([])
  const [isLoading, setIsLoading] = useState(true)
  console.log('watchlist', watchlist)

  async function getWatchlist() {
    const models = await DataStore.query(WatchList)
    setWatchlist(models);
    console.log('models', models);
    return models
  }

  useEffect(() => {
    getWatchlist().then(setWatchlist)
  }, [isLoading])

  async function removeFromWatchlist(id:any) {
    const thisTitle = watchlist.filter(function(item) {return item.id === id})
     .map(function(item) {return item.name})

    console.log('id to remove', id);
    try {
      const modelToDelete:any = await DataStore.query(WatchList, id)
      DataStore.delete(modelToDelete);
      toast({
        title: 'Item removed to watchlist',
        description: `${thisTitle} has been removed from your watchlist.`,
        status: 'success',
        duration: 5000,
        position: 'top',
        isClosable: true,
      });
      getWatchlist();
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }
  
  
  return (
  
      <div className="flex flex-wrap -m-1 md:-m-2 py-8">
        
        {watchlist.length==0 ? <div className='flex flex-col items-center w-full text-xl text-center rounded bg-container-outer pt-12 pb-36 px align-middle'>
          <div className="flex items-center">
            <div className="mr-4 fa-regular fa-bookmark"></div>
            <div className="text-l font-medium">My Watchlist</div>
          </div>
          <div className="w-full flex justify-center mt-14">
            <Image></Image>
          </div>
          <div className="w-full flex justify-center mt-10">
            <div className="text-base font-medium w-80">Currently you have no comics saved to the watchlist.</div>
          </div>
          <div className="w-full flex justify-center mt-10">
            <Link to="/search" className="button button-primary text-base font-medium">View popular comics</Link>
          </div>
        </div> : ''}
        {watchlist.map(({id, issueId, imageId, publisher, name, issue}) => (
            
            <WatchListResultBig 
              key={id} 
              id={id}
              issue_id={issueId} 
              cpg_id={imageId} 
              publisher_name={publisher}
              title_name={name}
              issue_num={issue} 
              removeFromWatchlist = {removeFromWatchlist}
                />
        ))}  
      </div>
  
  )
}


