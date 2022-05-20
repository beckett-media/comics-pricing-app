import useSWR from "swr"

import Gallery from "./Gallery"
import Title from "components/common/Title"

type TitleDetails = {
  id: string
  name: string
  publisher: string
}

export default function PopularSeries() {
  const { data: titles } = useSWR<TitleDetails[]>("/api/title/popular")

  if (!titles) {
    return <div>loading</div>
  }

  return (
    <Gallery title="Popular Series">
      {titles.map(({ id, name, publisher }) => (
        <Title key={id} id={id} name={name} publisher={publisher} />
      ))}
    </Gallery>
  )
}
