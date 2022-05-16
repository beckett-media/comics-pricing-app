import SearchBar from "components/common/SearchBar"

export default function NavBar() {
  return (
    <div className="w-full h-24 bg-background grid grid-cols-navbar">
      <div className="text-center text-header">Comics Surge</div>
      <SearchBar />
      <NavBarButtons />
    </div>
  )
}

function NavBarButtons() {
  return (
    <div className="flex flex-row p-2 space-x-2 items-center">
      <div className="w-20 h-6 bg-button text-text text-center rounded-full">search</div>
      <div className="grow flex flex-row justify-center space-x-2">
        <div className="w-8 h-8 bg-button text-text text-center rounded-full">N</div>
        <div className="w-8 h-8 bg-button text-text text-center rounded-full">M</div>
      </div>
    </div>
  )
}
