import ThinGallery from "./ThinGallery"
import MiniIssue from "./MiniIssue"

export default function MyWatchlist() {
  return (
    <div className="overflow-hidden rounded">
      <ThinGallery title="My Watchlist">
        <MiniIssue />
        <MiniIssue />
        <MiniIssue />
        <MiniIssue />
      </ThinGallery>
    </div>
  )
}
