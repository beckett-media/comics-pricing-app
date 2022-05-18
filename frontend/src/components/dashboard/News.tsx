import axios from "axios"
import useSWR from "swr"

export default function News() {
  const { data: news } = useNews()

  if (!news) {
    return <div>loading</div>
  }

  const { url, urlToImage, title } = news.articles[0]

  return (
    <div className="w-7/12">
      <a href={url} className="relative flex h-full flex-col ">
        <img
          src={urlToImage}
          className="h-full w-full overflow-hidden rounded object-cover"
          alt={title}
        />
        <span className="absolute z-0 m-5 text-lg text-white">{title}</span>
      </a>
    </div>
  )
}

function useNews() {
  const url =
    "https://newsapi.org/v2/everything?q=Comics&from=2022-05-17&sortBy=relevancy&pageSize=1&apiKey=562595bc762f4eb8a9aed8763c3b08be"

  return useSWR<any>(url, (url) => axios.get(url).then((res) => res.data))
}
