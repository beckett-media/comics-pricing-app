export default function NavBar() {
  return (
    <div className="grid h-24 w-full grid-cols-navbar bg-slate-300">
      <div className="flex flex-col items-center justify-center text-center text-2xl">
        <div>COMIC SURGE</div>
      </div>
      <SearchBar />
      <NavBarButtons />
    </div>
  )
}

function SearchBar() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <input className="h-8 w-full rounded bg-slate-100 px-2" placeholder="Search"></input>
    </div>
  )
}

function NavBarButtons() {
  return (
    <div className="flex flex-row items-center space-x-2 p-2">
      <button className="text-text h-8 w-20 rounded-full bg-slate-100 text-center hover:bg-slate-200">
        search
      </button>
      <div className="flex grow flex-row justify-center space-x-2">
        <button className="h-8 w-8 rounded-full bg-slate-100 text-center hover:bg-slate-200">
          N
        </button>
        <button className="h-8 w-8 rounded-full bg-slate-100 text-center hover:bg-slate-200">
          M
        </button>
      </div>
    </div>
  )
}
