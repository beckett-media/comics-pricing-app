import { ReactNode } from "react"
import {Link} from "react-router-dom"

type GalleryProps = {
  title: string
  children?: ReactNode
  link: string
}

function Gallery({ title, children, link }: GalleryProps) {
  return (
    <div className="flex w-full flex-col rounded bg-container-outer p-7 text-common-text">
      <div>
        <span className="mr-5 font-semibold">{title}</span>
        <Link to={link} className="button button--primary">View All ›</Link>
      </div>
      <div className="flex w-full flex-row justify-between gap-10 overflow-x-auto pt-5">
        {children}
      </div>
    </div>
  )
}

Gallery.defaultProps = {
  link: "/"
}

export default Gallery