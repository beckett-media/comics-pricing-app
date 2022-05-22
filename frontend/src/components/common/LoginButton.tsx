const loginUrl = new URL("https://comics.auth.us-east-1.amazoncognito.com/login")
const baseUrl = process.env.NODE_ENV === "production" ? "https://www.comicsprice.guide" : "http://localhost:9000"

loginUrl.searchParams.set("client_id", "2ca9tq8ue0rp1n8vc5ckfh0c40")
loginUrl.searchParams.set("response_type", "code")
loginUrl.searchParams.set("scope", "email openid phone")
loginUrl.searchParams.set("redirect_uri", `${baseUrl}/api/user/login/`)

const LoginButton = () => {
  return (
    <a
      className={
        "bg-white hover:bg-slate-100 text-black py-2 px-10 rounded focus:outline-none focus:shadow-outline border-2"
      }
      href={loginUrl.toString()}
    >
      Sign In
    </a>
  )
}

export default LoginButton
