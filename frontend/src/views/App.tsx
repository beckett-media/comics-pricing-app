import { ReactNode } from "react";

type BlockProps = {
  children?: ReactNode;
};

const Block = (props: BlockProps) => (
  <div className="rounded-2xl shadow-xl hover:shadow-2xl flex h-1/2 w-1/2 flex items-center justify-center bg-slate-200">
    {props.children}
  </div>
);

export const App = () => (
  <div className="absolute flex h-full w-full items-center justify-center gap-10 bg-gray-400">
    <Block>
      {"hello, friend."}
    </Block>
  </div>
);
