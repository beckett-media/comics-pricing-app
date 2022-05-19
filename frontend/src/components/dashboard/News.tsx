// import axios from "axios"
// import useSWR from "swr"

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
  // const url =
  //   "https://newsapi.org/v2/everything?q=Comics&from=2022-05-17&sortBy=relevancy&pageSize=1&apiKey=562595bc762f4eb8a9aed8763c3b08be"

  // return useSWR<any>(url, (url) => axios.get(url).then((res) => res.data))
  return {
    "data": {
      "status": "ok",
      "totalResults": 432,
      "articles": [
          {
              "source": {
                  "id": null,
                  "name": "Gizmodo.com"
              },
              "author": "Germain Lussier",
              "title": "And Your 2022 Eisner Award Nominees Are...",
              "description": "Marvel might be leading the comic book industry at the box office but it’s bringing up the rear on the awards circuit. The nominees for the biggest prizes in the comic book industry, the Will Eisner Comic Awards, have just been announced for 2022 and DC Comic…",
              "url": "https://gizmodo.com/eisner-awards-2022-nominations-dc-image-marvel-nightwin-1848943614",
              "urlToImage": "https://i.kinja-img.com/gawker-media/image/upload/c_fill,f_auto,fl_progressive,g_center,h_675,pg_1,q_80,w_1200/b63639e8c5a7acddc65034893b17c9b6.jpg",
              "publishedAt": "2022-05-18T19:15:00Z",
              "content": "Marvel might be leading the comic book industry at the box office but its bringing up the rear on the awards circuit. The nominees for the biggest prizes in the comic book industry, the Will Eisner C… [+16050 chars]"
          }
      ]
    }
  }
}
