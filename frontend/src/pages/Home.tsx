import { ReactNode } from "react"
import useSWR from "swr"

type BlockProps = {
  children?: ReactNode
}

const Block = (props: BlockProps) => (
  <div className="rounded-2xl shadow-xl hover:shadow-2xl flex h-1/2 w-1/2 flex items-center justify-center bg-slate-800 text-white font-bold">
    {props.children}
  </div>
)

export const Home = () => {
  const { data, error } = useSWR("/api/testAPI")
  return (
    <div className="absolute flex h-full w-full items-center justify-center gap-10 bg-slate-800">
      <Block>{"hello, 😉."}</Block>
      <Block>{data}💪</Block>
    </div>
  )
}
