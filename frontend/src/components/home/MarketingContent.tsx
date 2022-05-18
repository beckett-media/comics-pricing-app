import { useState } from "react"
import { Toaster } from "react-hot-toast"
import SignUp from "components/home/SignUp"

export default function MarketingContent() {
  const [showForm, setShowForm] = useState(true)

  return (
    <div className="flex flex-col items-center space-y-7 bg-black h-screen w-full pt-7 pb-7">
      <p className="text-white text-2xl font-bold font-roboto text-center">
        The best comic prices at your fingertips
      </p>
      <p className="text-gray-400 font-roboto font-thin w-64 h-55 text-center">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua.
      </p>
      {showForm ? <SignUp setShowForm={setShowForm} /> : null}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#FFFFFF",
          },
        }}
      />
    </div>
  )
}
