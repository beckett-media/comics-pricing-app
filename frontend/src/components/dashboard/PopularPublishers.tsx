import useSWR from "swr"

import Gallery from "./Gallery"
import Publisher from "./Publisher"
import type { Publisher as PublisherData } from "types/api"

export default function PopularPublishers() {
  const { data: publishers } = useSWR<PublisherData[]>("/api/publisher/popular")

  if (!publishers) {
    return <div>loading</div>
  }

  return (
    <Gallery title="Popular Publishers">
      {publishers.map(({ id, name }) => (
        <Publisher key={id} id={id} name={name} />
      ))}
    </Gallery>
  )
}
