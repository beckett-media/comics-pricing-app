const getLoginUrl = () => {
  const loginUrl = new URL("https://comics.auth.us-east-1.amazoncognito.com/login")

  loginUrl.searchParams.set("client_id", "2ca9tq8ue0rp1n8vc5ckfh0c40")
  loginUrl.searchParams.set("redirect_uri", `${process.env.REACT_APP_API_URL}/api/user/login/`)
  loginUrl.searchParams.set("response_type", "code")
  loginUrl.searchParams.set("scope", "email openid phone profile")
  loginUrl.searchParams.set("state", window.location.href)

  return loginUrl.toString()
}

const LoginButton = () => {
  return (
    <a
      className={
        "bg-white hover:bg-slate-100 text-black py-2 px-10 rounded focus:outline-none focus:shadow-outline border-2"
      }
      href={getLoginUrl()}
    >
      Sign In
    </a>
  )
}

export default LoginButton
