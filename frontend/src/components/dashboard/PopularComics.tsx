import useSWR from "swr"
import { Link } from "react-router-dom"
import React from "react"
import Gallery from "./Gallery"
import Issue from "components/common/Issue"
import type { IssueMinimal } from "types/api"
import { API } from "aws-amplify"
import usePopularComics from "hooks/data/usePopularComics"

export default function PopularComics() {
  const { data: issues, isLoading, isError } = usePopularComics();


  if (!issues) {
    return <div>loading</div>
  }

  return (
    <Gallery title="Popular Comics" link={"/"}>
      {issues.map(({ id, issue, title, publisher }) => (
        <Link key={id} to={`/details/${id}`}>
          <Issue id={id} issue={issue} title={title} publisher={publisher} />
        </Link>
      ))}
    </Gallery>
  )
}
