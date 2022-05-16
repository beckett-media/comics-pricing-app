import axios from "axios"
import React, { useState } from "react"
import toast, { Toaster } from "react-hot-toast"

export default function MarketingContent() {
  const [showForm, setShowForm] = useState(true)

  const setShowFormToTrue = () => setShowForm(false)
  const notify = (message: string) => toast(message)

  const SignUp = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")

    const submit = async (event: React.SyntheticEvent) => {
      event.preventDefault()
      try {
        const emailEntry = { email, name }
        await axios.post("/api/user/waitlist", emailEntry)
        setShowFormToTrue()
        notify("Successfully added to the waitlist!")
      } catch (e) {
        notify("Error: Failed to add you to the waitlist!")
      }
    }

    return (
      <form onSubmit={(e) => submit(e)} className="flex flex-col space-y-3">
        <label>
          <input
            placeholder={"your name"}
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            className="shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </label>
        <label>
          <input
            type="email"
            placeholder={"your best email"}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="shadow appearance-none border  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </label>
        <button
          type={"submit"}
          className="bg-white hover:bg-slate-100 text-black py-3 w-full focus:outline-none focus:shadow-outline"
        >
          Join the waitlist
        </button>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#FFFFFF",
            },
          }}
        />
      </form>
    )
  }

  return (
    <div className="flex flex-col items-center space-y-7 bg-black h-full w-full pt-7 pb-7">
      <p className="text-white text-2xl font-bold font-roboto text-center">
        The best comic prices at your fingertips
      </p>
      <p className="text-gray-400 font-roboto font-thin w-64 h-55 text-center">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua.
      </p>
      {showForm ? <SignUp /> : null}
      <img
        className="object-scale-down h-96 "
        src="https://nickpassey.com/wp-content/uploads/2016/10/Featured.jpg"
        alt=""
      ></img>
    </div>
  )
}
