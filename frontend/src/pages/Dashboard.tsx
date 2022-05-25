import BrowseByEra from "components/dashboard/BrowseByEra"
import NewComics from "../components/dashboard/NewComics"
import News from "components/dashboard/News"
import PopularComics from "components/dashboard/PopularComics"
import PopularPublishers from "components/dashboard/PopularPublishers"
import PopularSeries from "components/dashboard/PopularSeries"
import RecentlyViewed from "components/dashboard/RecentlyViewed"
import RecentPriceDrops from "../components/dashboard/RecentPriceDrops"
import TrendingTitles from "../components/dashboard/TrendingTitles"
import MyWatchlist from "components/dashboard/MyWatchlist"

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-5 py-5 px-10">
      <div className="flex flex-row items-stretch gap-5">
        <News />
        <div className="flex w-5/12 flex-col gap-5">
          <RecentlyViewed />
          <MyWatchlist />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-5">
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
