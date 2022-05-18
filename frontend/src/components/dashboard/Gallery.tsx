import { ReactNode } from "react"

type GalleryProps = {
  title: string
  children?: ReactNode
}

export default function Gallery({ title, children }: GalleryProps) {
  return (
    <div className="flex w-full flex-col">
      <div className="mb-5">
        <span className="mr-5 font-bold">{title}</span>
        <span className="cursor-pointer text-xs hover:underline">View All ›</span>
      </div>
      <div className="flex w-full flex-row justify-between space-x-10 overflow-x-auto">
        {children}
      </div>
    </div>
  )
}
