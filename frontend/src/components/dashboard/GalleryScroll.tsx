import {Link} from "react-router-dom"
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import { LeftArrow, RightArrow } from "../horizontal-scroll/arrows";

type scrollVisibilityApiType = React.ContextType<typeof VisibilityContext>;

type GalleryScrollProps = {
  title: string
  children?: any
  link: string
  fullScreen: boolean
}

function GalleryScroll({ title, children, link, fullScreen }: GalleryScrollProps) {
  return (
     
    <div className="flex w-full flex-col rounded bg-container-outer p-7 text-common-text">
      
      {fullScreen && (<div className="flex justify-between items-center">
        <span className="heading mr-5 text-xl font-semibold">{title}</span>
        { link!='' ?  <Link to={link} className="button button-secondary">View All ›</Link> : <span></span> }
      </div>)}
      
      {!fullScreen && (<div className="flex justify-center items-center">
        <span className="heading font-semibold">{title}</span>
      </div>)}

      <div className="w-full flex-row justify-between gap-10 overflow-x-auto pt-5 ">
        <ScrollMenu
          LeftArrow={LeftArrow}
          RightArrow={RightArrow}
          onWheel={onWheel}
        >
            {children}
        </ScrollMenu>
        </div>
    </div>
    
  )
}

function onWheel(apiObj: scrollVisibilityApiType, ev: React.WheelEvent): void {
  const isThouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15;

  if (isThouchpad) {
    ev.stopPropagation();
    return;
  }

  if (ev.deltaY < 0) {
    apiObj.scrollNext();
  } else if (ev.deltaY > 0) {
    apiObj.scrollPrev();
  }
}

GalleryScroll.defaultProps = {
  link: "/",
  fullScreen: true
}

export default GalleryScroll