import { ReactNode } from "react"
import useSWR from "swr"
import { ReactNode } from "react";
import React, { useState } from 'react';

type BlockProps = {
  children?: ReactNode;
};

const SignUp = (props: BlockProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const submit = async (event: React.SyntheticEvent) => {
    console.log(name);
    console.log(email)
    console.log('submit');
  };

  return (
    <div>
      <form
        onSubmit={e => submit(e) }
      >
        <label>
          <input placeholder={"name"} type="text"
                 onChange={e => setName(e.target.value)}
                 value={name}
          />
        </label>
        <br />
        <label>
          <input type="email" placeholder={"email"}
                 onChange={e => setEmail(e.target.value)}
                 value={email}
          />
        </label>
        <br />
        <div>
          <button type={"submit"}>Join!</button>
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
      <Block>{"hello, 😉."}</Block>
      <Block>{data}💪</Block>
    </div>
  )
}
export const Home = () => (
  <div className="absolute flex h-full w-full items-center justify-center gap-10 bg-slate-800">
    <Block>{"Get the latest from Comic Pricing App!"}</Block>
    <SignUp/>
  </div>
);
