import axios from "axios"
import { useEffect, useState } from "react"
// import useSWR from "swr"

const newsApiURL =
  "https://newsapi.org/v2/everything?q=Comics&from=2022-05-17&sortBy=relevancy&pageSize=1&apiKey=562595bc762f4eb8a9aed8763c3b08be"

export default function News() {
  const [newsApi, setNewsApi] = useState<any>(null)

  useEffect(() => {
    axios.get(newsApiURL).then((response: any) => {
      setNewsApi(response.data.articles[0])
    })
  }, [])

  return (
    <div className="w-7/12">
      {newsApi ? (
        <a href={newsApi.url} className="relative flex h-full flex-col ">
          <img
            src={newsApi.urlToImage}
            className="absolute h-full w-full overflow-hidden rounded object-cover"
            alt=""
          />
          <span className="z-0 m-5 text-lg text-white">
            Headline Comic Article:
            <br />
            {newsApi.title}
          </span>
        </a>
      ) : (
        <img
          src="https://user-images.githubusercontent.com/24848110/33519396-7e56363c-d79d-11e7-969b-09782f5ccbab.png"
          alt=""
        />
      )}
    </div>
  )
}

// export default function News() {
//   const { data: newsApi, error } = useSWR<any>(newsApiURL, fetcher)
//   console.log(error)
//   if (error) {
//     return <div>{error.toString()}</div>
//   }

//   if (!newsApi) {
//     return <div>Loading...</div>
//   }

//   return (
//     <a href={newsApi.url} className="relative flex h-full flex-col ">
//       <img
//         src={newsApi.urlToImage}
//         className="absolute h-full w-full overflow-hidden rounded object-cover"
//       />
//       <span className="z-0 m-5 text-lg text-white">
//         Headline Comic Article:
//         <br />
//         {newsApi.title}
//       </span>
//     </a>
//   )
// }
