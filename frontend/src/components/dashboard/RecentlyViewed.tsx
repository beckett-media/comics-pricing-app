import Gallery from "./Gallery"
import Issue from "./Issue"

export default function RecentlyViewed() {
  return (
    <div className="overflow-hidden rounded">
      <Gallery title="Recently Viewed" fullScreen={false}>
        <div className='w-full text-xl text-center'>You have no recently viewed items.</div>
      </Gallery>
    </div>
  )
}