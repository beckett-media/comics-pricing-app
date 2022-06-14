import {ReactComponent as Logo} from "../../assets/beckett-logo.svg"

export default function Footer() {
  return (
    <div className="bottom-0 z-10 w-full bg-hdr-ftr flex items-center gap-20 justify-center py-9 font-semibold">
      <div className="grid grid-cols-3 justify-items-center items-center gap-12">
      <a href="https://www.beckettmedia.com/">Visit Site</a>
      <Logo/>
      <div>Terms of Service</div>
      </div>
    </div>
  )
}
