import { Link } from "react-router-dom"
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
    <div className="w-full h-3/6 overflow-hidden rounded">
      <Gallery title="My Watchlist" link={"/watchlist"} fullScreen={false}>
        {watchlist.length === 0 && (
          <div className="flex justify-center">
            <div className="flex justify-center items-center text-center w-6/12 px-2">You have not saved any comics yet. Go explore!</div>
            <div className="flex justify-center items-center w-6/12 px-2"><Link to="/search" className="button button-secondary">View hot comics</Link></div>
          </div>
        )}
        {watchlist && watchlist.map(({ id, issueId, imageId, publisher, name, issue }) => (
          <Link to={`/details/${issueId}`} >
          <Issue key={id} id={id} issue={issue} title={name} publisher={publisher} imageId={imageId}/>
          </Link>
        ))}
      </Gallery>
      
    </div>
  )
}
