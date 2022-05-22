import BrowseByEra from "components/dashboard/BrowseByEra"
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
    <div className="my-10 space-y-10 px-10">
      <div className="flex flex-row space-x-5">
        <News />
        <RecentlyViewed />
      </div>
      <div className="flex flex-row space-x-5">
        <TrendingTitles />
        <RecentPriceDrops />
        <NewComics />
      </div>
      <PopularPublishers />
      <PopularComics />
      <PopularSeries />
      <BrowseByEra />
    </div>
  )
}
