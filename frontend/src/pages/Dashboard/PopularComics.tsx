export default function PopularComics() {
  return (
    <div className="flex flex-col w-full">
      <div className="mb-5">
        <span className="font-bold mr-5">PopularComics</span>
        <span className="text-xs hover:underline cursor-pointer">View All ›</span>
      </div>
      <div className="flex flex-row w-full justify-between space-x-10 overflow-x-auto">
        <Issue />
        <Issue />
        <Issue />
        <Issue />
        <Issue />
        <Issue />
        <Issue />
      </div>
    </div>
  )
}

function Issue() {
  return (
    <div className="w-32 flex flex-col items-center">
      <div className="w-32 h-40 bg-slate-300"></div>
      <p className="text-xs text-center">Amazing Spider-Man #1</p>
      <p className="text-xs">Marvel</p>
    </div>
  )
}
