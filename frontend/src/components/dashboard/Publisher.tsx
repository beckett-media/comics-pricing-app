import {  AmplifyS3Image } from "@aws-amplify/ui-react/legacy"
type PublisherProps = {
  id: string
  name: string
  itemId: string
}

function image(id: string) {
  return `https://comicss3bucket100929-dev.s3.us-west-1.amazonaws.com/publishers/${id}`
}

export default function Publisher({ id, name, itemId }: PublisherProps) {
  return (
    <div className="flex w-48 px-8 flex-col items-center">
      <div className="h-32 w-40">
        {/* { <img className="h-32 w-40 object-contain" alt={name} src={image(id)} /> } */}
        <AmplifyS3Image 
          imgProps={ {'style': {'objectFit':'contain', 'height':'8rem', 'width':'10rem'} }}  
          imgKey={`publishers/${id}`} 
        />
        {/* <AmplifyS3Image imgKey={"publishers/001efa98-55ff-4dec-abd7-87c513f0d2f6"} /> */}
      </div>
      <p className="text-center text-xs">
        {name}
      </p>
    </div>
  )
}
