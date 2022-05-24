import Gallery from "./Gallery"
import Issue from "./Issue"

export default function RecentlyViewed() {
  return (
    <div className="overflow-hidden rounded">
      <Gallery title="Recently Viewed">
        {[...Array(5).keys()].map((idx) => (
          <Issue key={idx.toString()} />
        ))}
      </Gallery>
    </div>
  )
}
