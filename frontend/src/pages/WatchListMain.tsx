import { WatchList } from "../models"
import { DataStore } from "@aws-amplify/datastore"
import { useEffect, useState, useContext } from "react"
import { Link } from "react-router-dom"
import { NavBarContext } from "components/common/NavBar"
import WatchListResultBig from "components/watchlist/WatchListResultBig"
import { useToast } from '@chakra-ui/react'


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
  
      <div className="flex flex-wrap -m-1 md:-m-2 py-8 ">
     
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


