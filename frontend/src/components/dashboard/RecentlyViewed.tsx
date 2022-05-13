import Gallery from "./Gallery"
import Issue from "./Issue"

export default function RecentlyViewed() {
  return (
    <div className="flex-row border-2 p-3">
      <Gallery title="Recently Viewed">
        {[...Array(5).keys()].map((_) => (
          <Issue />
        ))}
      </Gallery>
    </div>
  )
}
