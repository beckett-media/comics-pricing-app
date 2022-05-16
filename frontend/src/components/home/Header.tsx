import { LoginButton } from "../../pages/Login"

export default function Header() {
    return (
      <div>
            <div className="flex flex-row items-center justify-center p-3 space-x-6">
                <div className="flex-1"></div>
                <p className="flex-1 text-xl font-roboto font-bold">COMIC SURGE</p>
                <div className="">
                    <LoginButton />
                </div>
            </div>
      </div>
    )
  }