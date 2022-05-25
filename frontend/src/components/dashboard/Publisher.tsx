type PublisherProps = {
  id: string
  name: string
}

function image(id: string) {
  return `https://comics-scans.s3.amazonaws.com/publishers/${id}`
}

export default function Publisher({ id, name }: PublisherProps) {
  return (
    <div className="flex h-40 w-40 flex-col items-center gap-3">
      <div className="h-32 w-40">
        <img className="h-32 w-40 object-contain" alt={name} src={image(id)} />
      </div>
      <p className="whitespace-nowrap text-center text-xs font-semibold">{name} Comics</p>
    </div>
  )
}
