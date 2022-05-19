import useSWR, { useSWRConfig } from "swr"
import axios from "axios"


function createUser(name: string, email: string, mutate: (path: string) => void) {
  // TODO(sriram): add toast
  axios.post("api/user/createUser", { name, email })
  mutate("/api/user/waitlist")
}

export default function Admin() {
  const { mutate } = useSWRConfig()
  const {
    data: waitList,
    error,
  } = useSWR<{ name: string, email: string }[]>("/api/user/waitlist")
  const table = error ? <div>
    {error}
  </div> : waitList ? <table>
    <thead>
    <tr>
      <th>email</th>
      <th>username</th>
      <th>&nbsp;</th>
    </tr>
    </thead>
    {waitList.map(({ name, email }) => <tr key={email}>
      <td>{email}</td>
      <td>{name}</td>
      <td>
        <button
          className={"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"}
          onClick={() => createUser(name, email, mutate)}>add user ✅
        </button>
      </td>
    </tr>)}
  </table> : <div>Loading</div>
  return <div className={"w-fit my-0 mx-auto"}>{table}</div>
}
