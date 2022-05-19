import { getTitleImage } from "utils/imagePath"

type TitleProps = {
  id: string
  name: string
  publisher?: string
}

export default function Title({ id, name, publisher }: TitleProps) {
  return (
    <div className="flex w-32 flex-col items-center space-y-3">
      <div className="h-40 w-32">
        <img className="h-full w-full object-contain" alt={name} src={getTitleImage(id)} />
      </div>
      <p className="text-center text-xs">{name}</p>
      {publisher && <p className="text-xs">{publisher}</p>}
    </div>
  )
}
