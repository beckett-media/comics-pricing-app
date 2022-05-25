import { getTitleImage } from "utils/imagePath"

type TitleProps = {
  id: string
  name: string
  publisher?: string
}

export default function Title({ id, name, publisher }: TitleProps) {
  return (
    <div className="flex w-32 flex-col items-center">
      <div className="h-40 w-32">
        <img className="h-full w-full object-contain" alt={name} src={getTitleImage(id)} />
      </div>
      <div className="whitespace-nowrap pt-3 text-center text-xs font-semibold">{name}</div>
      <div className="text-xxs">{publisher}</div>
    </div>
  )
}
