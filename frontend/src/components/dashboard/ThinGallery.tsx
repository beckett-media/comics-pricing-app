import { ReactNode } from "react"

type ThinGalleryProps = {
  title: string
  children?: ReactNode
}

export default function ThinGallery({ title, children }: ThinGalleryProps) {
  return (
    <div className="flex w-full flex-col gap-3 rounded bg-container-outer p-4 text-common-text">
      <div className="text-md w-full text-center font-semibold">{title}</div>
      <div className="flex w-full flex-row justify-between gap-10 overflow-x-auto rounded bg-container-inner py-4 px-10">
        {children}
      </div>
    </div>
  )
}
