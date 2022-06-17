import axios from "axios"
import useSWR from "swr"

export default function NewsStatic() {


  return (
    <div className="w-7/12">
      <a target="_blank" href={'https://www.belfasttelegraph.co.uk/entertainment/news/ex-marvel-writer-garth-ennis-to-launch-new-work-at-enniskillen-comic-fest-41749156.html'} className="relative flex h-full flex-col ">
        <img
          src={'/news_static.jpg'}
          className="h-full w-full overflow-hidden rounded object-cover"
          alt={'Ex-Marvel writer Garth Ennis to launch new work at Enniskillen Comic Fest'}
        />
        {/* <span className="absolute z-0 m-0 bg-headline p-4 font-large text-white"> */}
        <span className="react-news">
        {'Ex-Marvel writer Garth Ennis to launch new work at Enniskillen Comic Fest'}
        </span>
      </a>
    </div>
  )
}