import axios from "axios"
import React, { useState, ReactNode } from 'react';
import useSWR from "swr";

type BlockProps = {
  children?: ReactNode;
};

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const submit = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    try {
      const emailEntry = {
        email: email,
        name: name
      };
      const res = await axios.post("/api/user/signup", emailEntry);
      console.log(res)
      console.log("Successfully added the new email.");
    } catch (e) {
      console.log("Failed to add the new emails.");
      console.log(e)
    }
  };

  return (
    <div className="rounded-2xl shadow-xl hover:shadow-2xl flex h-1/2 w-1/2 flex items-center justify-center">
      <form
        onSubmit={e => submit(e)}
        className="px-8 pt-6 pb-8 mb-4"
      >
        <h3 className="text-white mb-4">Sign Up</h3>
        <div className="mb-4">
          <label>
            <input type="email" placeholder={"email"}
                   onChange={e => setEmail(e.target.value)}
                   value={email}
                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </label>
        </div>
        <div className="mb-6">
        <label>
          <input placeholder={"name"} type="text"
                 onChange={e => setName(e.target.value)}
                 value={name}
                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </label>
        </div>
        <div>
          <button type={"submit"} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Join!</button>
        </div>
      </form>
    </div>
  );
};

const Block = (props: BlockProps) => (
  <div className="rounded-2xl shadow-xl hover:shadow-2xl flex h-1/2 w-1/2 flex items-center justify-center bg-slate-800 text-white font-bold">
    {props.children}
  </div>
)

export const Home = () => {
  const { data, error } = useSWR("/api/testAPI")
  return (
    <div className="absolute flex h-full w-full items-center justify-center gap-10 bg-slate-800">
      <Block>{"Get the latest from Comic Pricing App!"}</Block>
      <Block>{data}💪</Block>
      <SignUp />
    </div>
  )
}
