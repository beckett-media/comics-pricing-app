import ThinGallery from "./ThinGallery"
import MiniIssue from "./MiniIssue"

export default function RecentlyViewed() {
  return (
    <div className="overflow-hidden rounded">
      <ThinGallery title="Recently Viewed">
        <MiniIssue />
        <MiniIssue />
        <MiniIssue />
        <MiniIssue />
      </ThinGallery>
    </div>
  )
}
