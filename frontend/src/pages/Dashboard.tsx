import BrowseByEra from "components/dashboard/BrowseByEra"
import Footer from "components/dashboard/Footer"
import PopularComics from "components/dashboard/PopularComics"
import PopularPublishers from "components/dashboard/PopularPublishers"
import PopularSeries from "components/dashboard/PopularSeries"

export default function Dashboard() {
  return (
    <>
      <div className="w-full md:px-10 space-y-10 mb-10">
        <PopularPublishers />
        <PopularComics />
        <PopularSeries />
        <BrowseByEra />
      </div>
      <Footer />
    </>
  )
}
