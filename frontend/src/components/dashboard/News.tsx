import axios from "axios"
import { useState } from "react"

type NewsAPI = {
  articles: {
    title: string
    link: string
    media_content: string[]
  }[]
}

export default function News() {
  const { data: news } = useNews()

  if (!news) {
    return <div className="w-7/12">loading</div>
  }

  const {
    title,
    link,
    media_content: [media_url],
  } = news.articles[0]

  return (
    <div
      className="relative w-7/12 grow cursor-pointer overflow-hidden rounded bg-slate-300"
      onClick={() => {
        window.location.href = link
      }}
    >
      <img
        src={media_url}
        className="absolute h-full w-full overflow-hidden object-cover"
        alt={title}
      />
      <span className="absolute m-4 bg-headline p-2 font-header text-3xl font-bold text-white">
        {title}
      </span>
    </div>
  )
}

function useNews() {
  const [news, setNews] = useState<NewsAPI | undefined>()

  axios
    .request({
      method: "GET",
      url: "https://newscatcher.p.rapidapi.com/v1/search_free",
      params: { q: "comics", lang: "en", media: "True" },
      headers: {
        "X-RapidAPI-Host": "newscatcher.p.rapidapi.com",
        "X-RapidAPI-Key": "8a599490f2msh4847247ae5bac50p156765jsndd01faa397d7",
      },
    })
    .then((res) => setNews(res.data))

  return { data: news }
}
