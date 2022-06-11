import {
  Image,
} from "@chakra-ui/react"

import {Link} from "react-router-dom"


export default function BrowseByEra() {
  return  (
    <div className="w-full overflow-hidden rounded">

      
      <h1 className='heading mr-5 text-xl font-semibold'>Browse By Era</h1>

      <div className="flex w-full flex-row  gap-10  pt-3  ">

      <Link to={`/search`} className="">
        <Image src={require("assets/GoldenAge.png")} alt="logo" />
      </Link>
      <Link to={`/search`} className="">
        <Image src={require("assets/SilverAge.png")} alt="logo" />
      </Link>
      <Link to={`/search`} className="">
        <Image src={require("assets/BronzeAge.png")} alt="logo" />
      </Link>
      <Link to={`/search`} className="">
        <Image src={require("assets/ModernAge.png")} alt="logo" />
      </Link> 
      </div>
    </div>

  )


}
