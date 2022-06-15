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
    <div className="flex w-full flex-col h-full rounded bg-container-outer p-3 text-common-text">
      {fullScreen && (<div className="flex justify-between items-center">
        <span className="heading mr-5 text-xl font-semibold">{title}</span>
        <Link to={link} className="button button-secondary">View All ›</Link>
      </div>)}
      {!fullScreen && (<div className="flex justify-center items-center">
      <Link to={link}><span className="heading text-base font-semibold">{title}</span></Link>
      </div>)}
      <div className="w-full flex mt-3 gap-2 overflow-x-auto p-3 h-full items-center bg-container-inner rounded">
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