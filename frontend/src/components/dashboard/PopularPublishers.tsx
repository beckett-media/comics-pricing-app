import useSWR from "swr"
import * as React from "react"
import GalleryScroll from "./GalleryScroll"
import Publisher from "./Publisher"
import type { Publisher as PublisherData } from "types/api"
import { API } from "aws-amplify"
import usePopularPublishers from "hooks/data/usePopularPublishers"

export default function PopularPublishers() {
  const { data: publishers, isLoading } = usePopularPublishers()

  if (isLoading) {
    return <div>loading</div>
  }

  return (
    <GalleryScroll title="Browse by Publisher" link="/search">
      {publishers.map(({ id, name }) => (
        <Publisher key={id} id={id} itemId={id} name={name} />
      ))}
    </GalleryScroll>
  )
}