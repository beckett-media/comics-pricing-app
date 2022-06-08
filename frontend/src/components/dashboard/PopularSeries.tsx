import useSWR from "swr"

import Gallery from "./Gallery"
import Title from "components/common/Title"
import type { Title as TitleData } from "types/api"

export default function PopularSeries() {
  const { data: titles } = useSWR<TitleData[]>("/title/popular")

  if (!titles) {
    return <div>loading</div>
  }

  return (
    <Gallery title="Popular Series" link={"/"}>
      {titles.map(({ id, name, publisher }) => (
        <Title key={id} id={id} name={name} publisher={publisher} />
      ))}
    </Gallery>
  )
}
