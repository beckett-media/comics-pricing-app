import useSWR from "swr"
import React from "react"
import { getTitleImage } from "../../utils/imagePath"
import { Title } from "types/api"

const RelatedIssues: React.FC<{ issueId: string }> = ({ issueId }) => {
  const { data: relatedTitles } = useSWR<Title[]>(`/api/issue/${issueId}/related/titles`)
  return (
    <div>
      <p className={"text-center"}>
        <b>Related Titles</b>
      </p>
      <div className={"flex flex-col items-center justify-items-center"}>
        {relatedTitles?.map(({ id, name }) => (
          <div className={"m-5 flex flex-col items-center justify-center"}>
            <img className="object-fit w-8/12" alt="title cover" src={getTitleImage(id)} />
            <span>{name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RelatedIssues
