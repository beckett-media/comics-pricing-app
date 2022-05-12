import { ReactNode } from "react"

type GalleryProps = {
  title: string
  children?: ReactNode
}

export default function Gallery({ title, children }: GalleryProps) {
  return (
    <div className="flex flex-col w-full">
      <div className="mb-5">
        <span className="font-bold mr-5">{title}</span>
        <span className="text-xs hover:underline cursor-pointer">View All ›</span>
      </div>
      <div className="flex flex-row w-full justify-between space-x-10 overflow-x-auto">
        {children}
      </div>
    </div>
  )
}
