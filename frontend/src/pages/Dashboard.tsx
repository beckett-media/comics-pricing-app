import BrowseByEra from "components/dashboard/BrowseByEra"
import Footer from "components/dashboard/Footer"
import NewComics from "../components/dashboard/NewComics"
import News from "components/dashboard/News"
import PopularComics from "components/dashboard/PopularComics"
import PopularPublishers from "components/dashboard/PopularPublishers"
import PopularSeries from "components/dashboard/PopularSeries"
import RecentlyViewed from "components/dashboard/RecentlyViewed"
import RecentPriceDrops from "../components/dashboard/RecentPriceDrops"
import TrendingTitles from "../components/dashboard/TrendingTitles"

export default function Dashboard() {
  return (
    <>
      <div className="w-full px-10 space-y-10 my-10">
        <div className="flex flex-row space-x-10">
          <News />
          <div className="flex-col space-y-10 w-3/6">
            <RecentlyViewed />
          </div>
        </div>
        <div className="flex flex-row space-x-10">
          <TrendingTitles />
          <RecentPriceDrops />
          <NewComics />
        </div>

        <PopularPublishers />
        <PopularComics />
        <PopularSeries />
        <BrowseByEra />
      </div>
      <Footer />
    </>
  )
}
