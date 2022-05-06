import useSWR from "swr"
import React from "react"
import { getTitleImage } from "../../utils/imagePath"

type RelatedTitlesData = { id: string; name: string }

const RelatedIssues: React.FC<{ issueId: string }> = ({ issueId }) => {
  const { data: relatedTitles } = useSWR<RelatedTitlesData[]>(
    `/api/issue/${issueId}/related/titles`
  )
  return (
    <div>
      <p className={"text-center"}>
        <b>Related Titles</b>
      </p>
      <div className={"flex flex-col justify-items-center items-center"}>
        {relatedTitles?.map(({ id, name }) => (
          <div className={"flex flex-col justify-center items-center m-5"}>
            <img className="w-8/12 object-fit" alt="title cover" src={getTitleImage(id)} />
            <span>{name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RelatedIssues
