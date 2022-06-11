import useSWR from "swr"
import * as React from "react"
import GalleryScroll from "./GalleryScroll"
import Title from "components/common/Title"
import type { Publisher as PublisherData } from "types/api"
import { API } from "aws-amplify"
import usePopularSeries from "hooks/data/usePopularSeries"

export default function PopularSeries() {
  const { data: titles, isLoading } = usePopularSeries()

  if (isLoading) {
    return <div>loading</div>
  }
  console.log('nq titles', titles)

  return (
    <GalleryScroll title="Browse by Series" link="/">
      {titles.map(({ id, name, publisher }) => (
        <Title key={id} id={id} itemId={id} name={name} publisher={publisher} />
      ))}
    </GalleryScroll>
  )
}