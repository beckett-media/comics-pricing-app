import Gallery from "./Gallery"
import Issue from "./Issue"

export default function RecentlyViewed() {
  return (
    <div className="border-2 p-2 w-5/12">
      <Gallery title="Recently Viewed">
        {[...Array(5).keys()].map((_) => (
          <Issue />
        ))}
      </Gallery>
    </div>
  )
}
