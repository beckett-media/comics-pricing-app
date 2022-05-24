import Gallery from "./Gallery"
import Issue from "./Issue"

export default function MyWatchlist() {
  return (
    <div className="w-full overflow-hidden rounded">
      <Gallery title="My Watchlist">
        {[...Array(5).keys()].map((_) => (
          <Issue />
        ))}
      </Gallery>
    </div>
  )
}
