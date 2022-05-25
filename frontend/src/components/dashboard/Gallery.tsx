import { ReactNode } from "react"

import GradientButton from "components/common/GradientButton"

type GalleryProps = {
  title: string
  children?: ReactNode
}

export default function Gallery({ title, children }: GalleryProps) {
  return (
    <div className="flex w-full flex-col rounded bg-container-outer p-7 text-common-text">
      <div className="flex justify-between">
        <span className="mr-5 font-semibold">{title}</span>
        <GradientButton text="View All" bg="bg-container-outer" />
      </div>
      <div className="flex w-full flex-row justify-between gap-10 overflow-x-auto pt-5">
        {children}
      </div>
    </div>
  )
}
