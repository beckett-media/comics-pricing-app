import { ReactNode } from "react"

type GalleryProps = {
  title: string
  children?: ReactNode
}

export default function Gallery({ title, children }: GalleryProps) {
  return (
    <div className="flex w-full flex-col rounded bg-container-outer p-7 text-common-text">
      <div className="flex flex-row justify-between">
        <span className="mr-5 text-2xl font-semibold">{title}</span>
        <button className="group relative mb-2 mr-2 inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-primary-button-start to-primary-button-stop p-0.5 text-sm font-medium text-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 group-hover:from-purple-600 group-hover:to-blue-500 dark:text-white dark:focus:ring-blue-800">
          <span className="relative rounded-full bg-white px-9 py-1 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-container-outer">
            View All
          </span>
        </button>
      </div>
      <div className="flex w-full flex-row justify-between gap-10 overflow-x-auto pt-5">
        {children}
      </div>
    </div>
  )
}
