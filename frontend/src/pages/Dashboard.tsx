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
import NavBar from "components/common/NavBar"
import { API } from "aws-amplify"
import TrendsContainer from "components/dashboard/TrendsContainer"

export default function Dashboard() {
  return (
    <div className="px-10 my-10 space-y-10">
      
      <div className="w-full">
        <TrendsContainer />
      </div>
      <div className="flex flex-row space-x-5 h-80">
        <News />
        <div className="flex flex-col w-5/12 space-y-2">
          <RecentlyViewed />
          <MyWatchlist />
        </div>
      </div>
      <div className="flex flex-row space-x-2">
        <TrendingTitles />
        <RecentPriceDrops />
        <NewComics />
      </div>
      <PopularComics />
      <PopularSeries />
      <PopularPublishers />
      <BrowseByEra />
    </div>
  )
}
