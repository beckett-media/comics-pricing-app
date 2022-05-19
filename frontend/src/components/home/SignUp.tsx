import axios from "axios"
import toast, { Toaster } from "react-hot-toast"
import { useState } from "react"

const SignUp: React.FC<{ setShowForm: React.Dispatch<React.SetStateAction<boolean>> }> = ({
  setShowForm,
}) => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  const submit = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    try {
      const emailEntry = { email, name }
      await axios.post("https://api.comicsprice.guide/api/user/waitlist", emailEntry)
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
          className="shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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

export default SignUp
