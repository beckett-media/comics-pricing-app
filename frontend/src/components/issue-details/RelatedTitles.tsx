import useSWR from "swr"
import React from "react"
import { getTitleImage } from "../../utils/imagePath"
import { Title } from "types/api"
import { API } from "aws-amplify"

const RelatedIssues: React.FC<{ issueId: string }> = ({ issueId }) => {
  // const { data: relatedTitles } = useSWR<Title[]>(`/api/issue/${issueId}/related/titles`)

  const [relatedTitles, setData] = React.useState<Title[]>()
  const [error, setError] = React.useState<any>()

  const apiName = "comicsapi"
  const path = `/api/issue/${issueId}/related/titles`
  const myInit = {
    // OPTIONAL
    response: true, // OPTIONAL (return the entire Axios response object instead of only response.data)
  }

  React.useEffect(() => {
    API.get(apiName, path, myInit)
      .then((response) => {
        // Add your code here
        setData(response?.data)
      })
      .catch((error) => {
        console.log(error.response)
        setError(error)
      })
  }, [issueId])

  return (
    <div>
      <p className={"text-center"}>
        <b>Related Titles</b>
      </p>
      <div className={"flex flex-col items-center justify-items-center"}>
        {relatedTitles?.map(({ id, name }) => (
          <div className={"m-5 flex flex-col items-center justify-center"}>
            <img className="w-8/12 object-fit" alt="title cover" src={getTitleImage(id)} />
            <span>{name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RelatedIssues
