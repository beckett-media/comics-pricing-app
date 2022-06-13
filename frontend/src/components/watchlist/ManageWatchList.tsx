import { WatchList } from "../../models"
import { DataStore } from "@aws-amplify/datastore"
import { Button, Text } from "@chakra-ui/react"
import {useState}  from "react"
import { ReactComponent as Bookmark } from "assets/bookmark.svg"
import { useToast } from '@chakra-ui/react'



export default function ManageWatchList({data}: any) {
  const toast = useToast()

  const [isLoading, setIsLoading] = useState(true)

  async function addToWatchlist() {
    console.log('addtowatchlist', data.imageId);
    try {
      await DataStore.save(
        new WatchList({
          imageId: data.imageId,
          issueId: data.issueId,
          publisher: data.publisher,
          name: data.name,
          issue: data.issue,
        })
      )
      setIsLoading(false)
      toast({
        title: 'Item added to watchlist',
        description: `${data.name} has been added to your watchlist.`,
        status: 'success',
        duration: 9000,
        position: 'top',
        isClosable: true,
      })


    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }

  async function removeFromWatchlist() {
    try {
      const modelToDelete:any = await DataStore.query(WatchList, "a87f17a0-b66b-400c-9442-0fee2d22fd98")
      DataStore.delete(modelToDelete)
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }
  //removeFromWatchlist();

  return (
    <Button variant='ghost' onClick={() => addToWatchlist()}>
      <Bookmark style={{height:35}} />  
    </Button>
  )
  
}