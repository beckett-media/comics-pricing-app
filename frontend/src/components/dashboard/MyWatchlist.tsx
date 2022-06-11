import Gallery from "./Gallery"
import Issue from "./Issue"
import * as React from "react"
import { DataStore } from "@aws-amplify/datastore"
import { WatchList } from "../../models"
import { Button, Text } from "@chakra-ui/react"

export default function MyWatchlist() {
  const [watchlist, setWatchlist] = React.useState<WatchList[]>([])
  const [isLoading, setIsLoading] = React.useState(true)
  async function getWatchlist() {
    const models = await DataStore.query(WatchList)
    setWatchlist(models)
    return models
  }
  console.log(watchlist)

  async function addToWatchlist() {
    try {
      await DataStore.save(
        new WatchList({
          imageId: "017fa312-a1e2-4d55-9b67-a2d9facfc305",
          publisher: "Marvel",
          name: "Fantastic Four",
          issue: "23",
          img_id: "-wD0sSPEZoLHdeSEkedwMw=="
        })
      )
      getWatchlist()
      setIsLoading(false)
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }

  async function removeFromWatchlist() {
    try {
      const modelToDelete = await DataStore.query(WatchList, "123456789")
      // DataStore.delete(modelToDelete)
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }

  React.useEffect(() => {
    getWatchlist().then(setWatchlist)
    // const subscription = DataStore.observe(Watchlist).subscribe(() => {
    //   getWatchlist().then(setWatchlist)
    // })
    // return () => subscription.unsubscribe()
  }, [isLoading])

  return (
    <div className="w-full overflow-hidden rounded">
      <Button onClick={() => addToWatchlist()}>
        <Text>Add to Watchlist</Text>
      </Button>
      <Gallery title="My Watchlist" link={"/"} fullScreen={false}>
          {watchlist.map(({ id, imageId, publisher, name, issue, img_id }) => (
            <Issue 
              key={id} 
              id={imageId} 
              issue={issue} 
              title={name}
              publisher={publisher} 
              img_id={img_id} 
            />
          ))}
      </Gallery>
    </div>
  )
}
