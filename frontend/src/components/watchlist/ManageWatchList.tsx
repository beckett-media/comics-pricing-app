import { WatchList } from "../../models"
import { DataStore } from "@aws-amplify/datastore"
import { Button, Text } from "@chakra-ui/react"
import {useState}  from "react"
import { ReactComponent as Bookmark } from "assets/bookmark.svg"
import { useToast, Tooltip } from '@chakra-ui/react'


export default function ManageWatchList({data, currentWatchList}: any) {
  const toast = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [disable, setDisable] = useState(false);

  async function addToWatchlist() {
    setDisable(true);

    const watchListRecordExists = currentWatchList.some(function(item: any) {
      return item.issueId === data.issueId;
    })
    
    if (watchListRecordExists) {
      toast({
        title: 'Already watchlisted',
        description: `${data.name} is  already in your watchlist.`,
        status: 'warning',
        duration: 9000,
        position: 'top',
        isClosable: true,
      })
    } else {
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
          currentWatchList.push({
            issueId:data.issueId
          })
    
        } catch (error) {
          console.log(error)
          setIsLoading(false)
        }
      }


    }

    

  return (
    <Tooltip label={disable ? 'You have already bookmarked this item' : 'Bookmark this item'}>
      <div>
      <Button variant='ghost' onClick={() => addToWatchlist()} disabled={disable} >
        <Bookmark style={{height:35}} />  
      </Button>
      </div>
    </Tooltip>
  ) 
}