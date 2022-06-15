import { Link } from "react-router-dom"
import Gallery from "./Gallery"
import Issue from "./Issue"
import React from "react"
import { DataStore } from "@aws-amplify/datastore"
import { RecentlyView } from "../../models"

export default function RecentlyViewed() {
  const [recentlyView, setRecentlyView] = React.useState<RecentlyView[]>([])
  const [isLoading, setIsLoading] = React.useState(true)

  async function getRecentlyView() {
    const models = await DataStore.query(RecentlyView)
    const uniqueModels = [...new Map(models.map(item =>
      [item['issueId'], item])).values()];
    ;
    setRecentlyView(uniqueModels);
    setIsLoading(false)
    return uniqueModels
  }

  React.useEffect(() => {
    getRecentlyView().then(setRecentlyView)
  }, [isLoading])
  return (
    <div className="overflow-hidden rounded h-3/6">
      <Gallery title="Recently Viewed" fullScreen={false} link='/recent'>
        {recentlyView.length === 0 && (
          <div className="flex justify-center">
            <div className="flex justify-center items-center text-center w-6/12 px-2">You have not viewed any comics yet. Go explore!</div>
            <div className="flex justify-center items-center w-6/12 px-2"><Link to="/search" className="button button-secondary">View hot comics</Link></div>
          </div>
        )}
        {recentlyView && recentlyView.slice(0, 10).map(({ id, imageId, publisher, name, issue, issueId}) => (
          
          <Link to={`/details/${issueId}`}>
            <Issue
            key={id}
            id={id}
            issue={issue}
            title={name}
            publisher={publisher}
            imageId={imageId}
          />
          </Link>
        ))}
      </Gallery>
    </div>
  )
}
