import Logo from "components/common/Logo"

export default function Footer() {
  return (
    <div className="w-full h-40 bg-background flex flex-col justify-between items-start p-10">
      <div className="h-8 w-32">
        <Logo />
      </div>
      <div className="text-xs text-header">Visit Site</div>
    </div>
  )
}
