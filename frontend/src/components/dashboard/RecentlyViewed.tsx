import Gallery from "./Gallery"
import Issue from "./Issue"

export default function RecentlyViewed() {
  return (
    <div className="w-5/12 overflow-hidden rounded border-2 p-2">
      <Gallery title="Recently Viewed">
        {[...Array(5).keys()].map(idx => (
          <Issue key={idx.toString()} />
        ))}
      </Gallery>
    </div>
  )
}
