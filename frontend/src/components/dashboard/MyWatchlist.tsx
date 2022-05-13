import Gallery from "./Gallery"
import Issue from "./Issue"

export default function MyWatchlist() {
  return (
    <div className="flex-row border-2 p-3">
      <Gallery title="My Watchlist">
        {[...Array(5).keys()].map((_) => (
          <Issue />
        ))}
      </Gallery>
    </div>
  )
}
