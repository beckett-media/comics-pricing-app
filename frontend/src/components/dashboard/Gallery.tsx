import { ReactNode } from "react"
import {Link} from "react-router-dom"

type GalleryProps = {
  title: string
  children?: ReactNode
  link: string
  fullScreen: boolean
}

function Gallery({ title, children, link, fullScreen }: GalleryProps) {
  return (
    <div className="flex w-full flex-col rounded bg-container-outer p-7 text-common-text">
      {fullScreen && (<div className="flex justify-between items-center">
        <span className="heading mr-5 text-xl font-semibold">{title}</span>
        <Link to={link} className="button button-secondary">View All ›</Link>
      </div>)}
      {!fullScreen && (<div className="flex justify-center items-center">
        <span className="heading font-semibold">{title}</span>
      </div>)}
      <div className="flex w-full flex-row justify-between gap-10 overflow-x-auto pt-5">
        {children}
      </div>
    </div>
  )
}

Gallery.defaultProps = {
  link: "/",
  fullScreen: true
}

export default Gallery