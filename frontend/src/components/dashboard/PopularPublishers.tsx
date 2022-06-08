import useSWR from "swr"
import * as React from "react"

import Gallery from "./Gallery"
import Publisher from "./Publisher"
import type { Publisher as PublisherData } from "types/api"
import { API } from "aws-amplify"
import usePopularPublishers from "hooks/data/usePopularPublishers"

export default function PopularPublishers() {
  const { data: publishers, isLoading } = usePopularPublishers();

  if (isLoading) {
    return <div>loading</div>
  }

  return (
    <Gallery title="Popular Publishers" link="/">
      {publishers.map(({ id, name }) => (
        <Publisher key={id} id={id} name={name} />
      ))}
    </Gallery>
  )
}
