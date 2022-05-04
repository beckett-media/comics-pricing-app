import { ReactNode } from "react"

type BlockProps = {
  children?: ReactNode
}

const Block = (props: BlockProps) => (
  <div className="rounded-2xl shadow-xl hover:shadow-2xl flex h-1/2 w-1/2 flex items-center justify-center bg-slate-800 text-white font-bold">
    {props.children}
  </div>
)

export const Home = () => (
  <div className="absolute flex h-full w-full items-center justify-center gap-10 bg-slate-800">
    <Block>{"hello, 🫃."}</Block>
  </div>
)
