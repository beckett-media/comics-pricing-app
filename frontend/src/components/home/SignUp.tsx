import axios from "axios"
import toast from "react-hot-toast"
import React, { useState } from "react"

const SignUp: React.FC<{ setShowForm: React.Dispatch<React.SetStateAction<boolean>> }> = ({
  setShowForm,
}) => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")

  const verifyUsername = (username: string) => {
    if (username.match(/\s/)) {
      setUsername("")
      toast.error("username can't have whitespaces")
    } else {
      setUsername(username)
    }
  }

  const submit = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    try {
      const emailEntry = { email, username }
      await axios.post("/api/user/waitlist", emailEntry)
      setShowForm(false)
      toast("Successfully added to the waitlist!")
    } catch (e) {
      toast("Error: Failed to add you to the waitlist!")
      console.log(e)
    }
  }

  return (
    <form onSubmit={(e) => submit(e)} className="flex flex-col space-y-3">
      <label>
        <input
          placeholder={"username"}
          type="text"
          onChange={(e) => verifyUsername(e.target.value)}
          value={username}
          className="focus:shadow-outline w-full appearance-none border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
        />
      </label>
      <label>
        <input
          type="email"
          placeholder={"your best email"}
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          className="focus:shadow-outline w-full appearance-none border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
        />
      </label>
      <button
        type={"submit"}
        className="focus:shadow-outline w-full bg-white py-3 text-black hover:bg-slate-100 focus:outline-none"
      >
        Join the waitlist
      </button>
    </form>
  )
}

export default SignUp
