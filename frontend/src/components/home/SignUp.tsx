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
          className="shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </label>
      <label>
        <input
          type="email"
          placeholder={"your best email"}
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          className="shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </label>
      <button
        type={"submit"}
        className="bg-white hover:bg-slate-100 text-black py-3 w-full focus:outline-none focus:shadow-outline"
      >
        Join the waitlist
      </button>
    </form>
  )
}

export default SignUp
