import axios from "axios"
import React, { ReactNode, useState } from "react"

import LoginButton from "components/common/LoginButton"

type BlockProps = {
  children?: ReactNode
}

const SignUp = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  const submit = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    try {
      const emailEntry = { email, name }
      await axios.post("/api/user/waitlist", emailEntry)
    } catch (e) {
      console.log("Failed to add the new emails.")
    }
  }

  return (
    <div>
      <form onSubmit={(e) => submit(e)} className="mb-4 px-8 pt-6 pb-8">
        <div className="mb-4">
          <label>
            <input
              type="email"
              placeholder={"email"}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
            />
          </label>
        </div>
        <div className="mb-6">
          <label>
            <input
              placeholder={"name"}
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
            />
          </label>
        </div>
        <div>
          <button
            type={"submit"}
            className="focus:shadow-outline rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700 focus:outline-none"
          >
            Join!
          </button>
        </div>
      </form>
    </div>
  )
}

const Block = (props: BlockProps) => (
  <div className="flex flex h-1/2 w-1/2 items-center justify-center rounded-2xl bg-slate-800 font-bold text-white shadow-xl hover:shadow-2xl">
    {props.children}
  </div>
)

export default function Home() {
  return (
    <div className="absolute flex h-full w-full items-center justify-center gap-10 bg-slate-800">
      <Block>
        {"Sign up to get the latest from Comic Pricing App!"}
        <SignUp />
      </Block>
      <Block>
        <LoginButton />
      </Block>
    </div>
  )
}
