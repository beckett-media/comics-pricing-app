import BrowseByEra from "./BrowseByEra"
import Footer from "./Footer"
import PopularComics from "./PopularComics"
import PopularPublishers from "./PopularPublishers"
import PopularSeries from "./PopularSeries"

export default function Dashboard() {
  return (
    <div className="w-full md:px-10 space-y-10">
      <PopularPublishers />
      <PopularComics />
      <PopularSeries />
      <BrowseByEra />
      <Footer />
    </div>
  )
}
