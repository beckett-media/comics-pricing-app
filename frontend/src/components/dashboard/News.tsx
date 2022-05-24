import axios from "axios"
import useSWR from "swr"

export default function News() {
  const { data: news } = useNews()

  console.log(news)

  if (!news) {
    return <div>loading</div>
  }

  const { title, link, media_content } = news.articles[0]

  return (
    <div className="w-7/12">
      <a href={link} className="relative flex h-full flex-col ">
        <img
          src={media_content[0]}
          className="h-full w-full overflow-hidden rounded object-cover"
          alt={title}
        />
        <span className="absolute z-0 m-2 bg-headline p-2 text-lg text-white">
          <p>Headline Comic Article</p>
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
      "X-RapidAPI-Key": "8a599490f2msh4847247ae5bac50p156765jsndd01faa397d7",
    },
  }

  return useSWR<any>(options, (options) => axios.request(options).then((res) => res.data))
}
