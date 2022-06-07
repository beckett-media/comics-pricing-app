import useSWR, { useSWRConfig } from "swr"
import axios from "axios"
import { Auth } from "aws-amplify"
import toast from "react-hot-toast"
import UserList from "components/admin/UserList"

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
  async function signOut() {
    try {
      await Auth.signOut({ global: true })
    } catch (error) {
      console.log("error signing out: ", error)
    }
  }

  // const { mutate } = useSWRConfig()
  // const { data: waitList, error } = useSWR<{ name: string; email: string }[]>(waitListPath)
  // const table = error ? (
  //   <div>{error}</div>
  // ) : waitList ? (
  //   <>
  //     <table className={"table-auto"}>
  //       <thead>
  //         <tr>
  //           <th>email</th>
  //           <th>username</th>
  //           <th>&nbsp;</th>
  //         </tr>
  //       </thead>
  //       <tbody>
  //         {waitList.map(({ name, email }) => (
  //           <tr key={email}>
  //             <td className={"px-3"}>{email}</td>
  //             <td className={"px-3"}>{name}</td>
  //             <td className={"px-3"}>
  //               <button
  //                 className={
  //                   "focus:shadow-outline rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700 focus:outline-none"
  //                 }
  //                 onClick={() => createUser(name, email, mutate)}
  //               >
  //                 add user ✅
  //               </button>
  //             </td>
  //           </tr>
  //         ))}
  //       </tbody>
  //     </table>
  //   </>
  // ) : (
  //   <div>Loading</div>
  // )
  // return <div className={"my-0 mx-auto w-fit"}>{table}</div>

  return (
    <div className={"my-0 mx-auto w-8/12"}>
      <button onClick={signOut}>Sign out</button>
      <UserList />
    </div>
  )
}
