import { ReactNode } from "react"

type GalleryProps = {
  title: string
  children?: ReactNode
}

export default function Gallery({ title, children }: GalleryProps) {
  return (
    <div className="flex w-full flex-col gap-5 rounded bg-container-outer px-7 py-5 text-common-text">
      <div>
        <span className="mr-5 font-header text-xl font-bold">{title}</span>
        <span className="cursor-pointer text-xs hover:underline">View All ›</span>
      </div>
      <div className="flex w-full flex-row justify-between gap-10 overflow-x-auto pb-3">
        {children}
      </div>
    </div>
  )
}
