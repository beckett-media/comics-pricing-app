type PublisherProps = {
  id: string
  name: string
}

function image(id: string) {
  return `https://comics-scans.s3.amazonaws.com/publishers/${id}`
}

export default function Publisher({ id, name }: PublisherProps) {
  return (
    <div className="w-40 h-40 flex flex-col items-center">
      <div className="w-40 h-32">
        <img className="w-40 h-32 object-contain" alt={name} src={image(id)} />
      </div>
      <p className="text-xs text-center">{name}</p>
    </div>
  )
}
