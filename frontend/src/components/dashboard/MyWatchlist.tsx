import Gallery from "./Gallery"
import Issue from "./Issue"
import * as React from "react"
import { DataStore } from "@aws-amplify/datastore"
import { WatchList } from "../../models"
import { Button, Text } from "@chakra-ui/react"

export default function MyWatchlist() {
  const [watchlist, setWatchlist] = React.useState<WatchList[]>([])
  const [isLoading, setIsLoading] = React.useState(true)
  console.log('watchlist', watchlist)

  async function getWatchlist() {
    const models = await DataStore.query(WatchList)
    setWatchlist(models);
    return models
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

      <Gallery title="My Watchlist" link={"/"} fullScreen={false}>
        {watchlist.map(({ id, imageId, publisher, name, issue }) => (
          <Issue key={id} id={id} issue={issue} title={name} publisher={publisher} imageId={imageId}/>
        ))}
      </Gallery>
    </div>
  )
}
