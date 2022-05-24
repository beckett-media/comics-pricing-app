import { Link } from "react-router-dom"

export default function NotFound() {
  return <div className={"flex flex-col items-center m-10"}>
    <h2>This page doesn't exist :(</h2>

    <button
      className={"focus:shadow-outline rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700 focus:outline-none m-4"}>
      <Link to={"/"}> Go Home</Link>
    </button>
  </div>
}
