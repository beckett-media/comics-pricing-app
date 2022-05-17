export default function NavBar() {
  return (
    <div className="w-full h-24 bg-slate-300 grid grid-cols-navbar">
      <div className="flex flex-col justify-center items-center text-center text-2xl">
        <div>COMIC SURGE</div>
      </div>
      <SearchBar />
      <NavBarButtons />
    </div>
  )
}

function SearchBar() {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <input className="w-full h-8 px-2 bg-slate-100 rounded" placeholder="Search"></input>
    </div>
  )
}

function NavBarButtons() {
  return (
    <div className="flex flex-row p-2 space-x-2 items-center">
      <button className="w-20 h-8 bg-slate-100 hover:bg-slate-200 text-text text-center rounded-full">
        search
      </button>
      <div className="grow flex flex-row justify-center space-x-2">
        <button className="w-8 h-8 bg-slate-100 hover:bg-slate-200 text-center rounded-full">
          N
        </button>
        <button className="w-8 h-8 bg-slate-100 hover:bg-slate-200 text-center rounded-full">
          M
        </button>
      </div>
    </div>
  )
}
