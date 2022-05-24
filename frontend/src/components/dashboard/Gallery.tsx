import { ReactNode } from "react"

type GalleryProps = {
  title: string
  children?: ReactNode
}

export default function Gallery({ title, children }: GalleryProps) {
  return (
    <div className="flex w-full flex-col rounded bg-container-outer p-7 text-common-text">
      <div>
        <span className="mr-5 font-semibold">{title}</span>
        <span className="cursor-pointer text-xs hover:underline">View All ›</span>
      </div>
      <div className="flex w-full flex-row justify-between gap-10 overflow-x-auto pt-5">
        {children}
      </div>
    </div>
  )
}
