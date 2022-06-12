import { useContext } from "react"
import { Link } from "react-router-dom"



export default function HotComics() {
  return (
    <div className="ml-20 flex flex-col gap-3">
      <p className="text-xl font-extrabold uppercase">Hot Comics</p>
      <div className="flex flex-col gap-10">
        <Link to="/">
          <div className="h-[200px] w-[160px] bg-slate-500 hover:scale-[1.02]" />
        </Link>
        <Link to="/">
          <div className="h-[200px] w-[160px] bg-slate-400 hover:scale-[1.02]" />
        </Link>
        <Link to="/">
          <div className="h-[200px] w-[160px] bg-slate-300 hover:scale-[1.02]" />
        </Link>
      </div>
    </div>
  )
}