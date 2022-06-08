import Gallery from "./Gallery"
import Issue from "./Issue"

export default function MyWatchlist() {
  return (
    <div className="w-full overflow-hidden rounded">
      <Gallery title="My Watchlist" link={"/"}>
        <Issue />
        <Issue />
        <Issue />
        <Issue />
        <Issue />
      </Gallery>
    </div>
  )
}
