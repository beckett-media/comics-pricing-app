import useSWR, { useSWRConfig } from "swr"
import axios from "axios"
import toast from "react-hot-toast"

const waitListPath = "/api/admin/waitlist"

async function createUser(name: string, email: string, mutate: (path: string) => void) {
  await toast.promise(axios.post("api/admin/createUser", { name, email }), {
    loading: "loading",
    success: "Successfully created user",
    error: (e) => {
      if (e.response) {
        return `Failed to create user: ${e.response.data}`
      } else {
        return `Failed to create user: ${e.message}`
      }
    },
  })
  mutate(waitListPath)
}

export default function Admin() {
  const { mutate } = useSWRConfig()
  const { data: waitList, error } = useSWR<{ name: string; email: string }[]>(waitListPath)
  const table = error ? (
    <div>{error}</div>
  ) : waitList ? (
    <>
      <table className={"m-5 table-auto"}>
        <thead>
          <tr className={"text-white"}>
            <th>email</th>
            <th>username</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {waitList.map(({ name, email }) => (
            <tr key={email}>
              <td className={"px-3 text-white"}>{email}</td>
              <td className={"px-3 text-white"}>{name}</td>
              <td className={"px-3 text-white"}>
                <button
                  className={
                    "focus:shadow-outline rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700 focus:outline-none"
                  }
                  onClick={() => createUser(name, email, mutate)}
                >
                  add user ✅
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  ) : (
    <div>Loading</div>
  )
  return <div className={"my-0 mx-auto w-fit"}>{table}</div>
}
