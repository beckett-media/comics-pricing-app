import LoginButton from "../common/LoginButton"

export default function Header() {
  return (
    <div>
      <div className="flex flex-row items-center justify-center space-x-6 p-3">
        <div className="flex-1"></div>
        <p className="font-roboto flex-1 text-xl font-bold">COMIC SURGE</p>
        <div className="">
          <LoginButton />
        </div>
      </div>
    </div>
  )
}
