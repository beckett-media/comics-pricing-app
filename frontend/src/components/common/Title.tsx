import {  AmplifyS3Image } from "@aws-amplify/ui-react/legacy"
import { Analytics, Auth } from "aws-amplify"

type TitleProps = {
  id: string
  name: string
  publisher?: string
  itemId: string
}

export default function Title({ id, name, publisher, itemId }: TitleProps) {

  function imgError(evt: any) {
    evt.target.src='/Pow.svg';
  }
  return (

<div className="flex w-48 px-8 flex-col items-center">
  <div className="h-32 w-40">
    {/* { <img className="h-32 w-40 object-contain" alt={name} src={image(id)} /> } */}
    <AmplifyS3Image  
      handleOnError={imgError}
      imgProps={ {'style': {'objectFit':'contain', 'height':'8rem', 'width':'10rem'} }}  
      imgKey={`titles/${id}`} 
    />
    {/* <AmplifyS3Image imgKey={"publishers/001efa98-55ff-4dec-abd7-87c513f0d2f6"} /> */}
  </div>
  <p className="text-center text-xs">
    {name}
    {publisher && <p className="text-xs">{publisher}</p>}
  </p>
  </div>
  )
}
