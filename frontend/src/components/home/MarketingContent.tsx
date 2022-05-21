import { useState } from "react"
import SignUp from "components/home/SignUp"

export default function MarketingContent() {
  const [showForm, setShowForm] = useState(true)

  return (
    <div className="flex h-screen w-full flex-col items-center space-y-7 bg-black pt-7 pb-7">
      <p className="font-roboto text-center text-2xl font-bold text-white">
        The best comic prices at your fingertips
      </p>
      <p className="font-roboto h-55 w-64 text-center font-thin text-gray-400">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua.
      </p>
      {showForm ? <SignUp setShowForm={setShowForm} /> : null}
    </div>
  )
}
