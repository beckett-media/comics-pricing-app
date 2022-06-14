import axios from "axios"
import useSWR from "swr"

export default function News() {
  const { data: news } = useNews()

  if (!news) {
    return <div>loading</div>
  }

  const {
    title,
    link,
    media_content: [media_url],
  } = news.articles[0]

  return (
    <div className="w-7/12">
      <a href={link} className="relative flex h-full flex-col ">
        <img
          src={media_url}
          className="h-full w-full overflow-hidden rounded object-cover"
          alt={title}
        />
        {/* <span className="absolute z-0 m-0 bg-headline p-4 font-large text-white"> */}
        <span className="react-news">
        {title}
        </span>
      </a>
    </div>
  )
}

function useNews() {
  const options = {
    method: "GET",
    url: "https://newscatcher.p.rapidapi.com/v1/search_free",
    params: { q: "comics", lang: "en", media: "True" },
    headers: {
      "X-RapidAPI-Host": "newscatcher.p.rapidapi.com",
      "X-RapidAPI-Key": "9cb228928cmshe7f478c68d6fea6p1066bbjsn9688eb278974",
    },
  }

  return useSWR(options, (options) => axios.request(options).then((res) => res.data))
}
