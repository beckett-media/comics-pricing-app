type PublisherProps = {
  id: string
  name: string
}

function image(id: string) {
  return `https://comicss3bucket100929-dev.s3.us-west-1.amazonaws.com/publishers/${id}`
}

export default function Publisher({ id, name }: PublisherProps) {
  return (
    <div className="flex h-40 w-40 flex-col items-center">
      <div className="h-32 w-40">
        <img className="h-32 w-40 object-contain" alt={name} src={image(id)} />
      </div>
      <p className="text-center text-xs">{name}</p>
    </div>
  )
}
