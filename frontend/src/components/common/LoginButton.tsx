const getLoginUrl = () => {
  const loginUrl = new URL("https://comics.auth.us-west-1.amazoncognito.com/login")

  loginUrl.searchParams.set("client_id", "4tii5u5mi6c0ch9v091v63g9bg")
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
        "focus:shadow-outline rounded border-2 bg-white py-2 px-10 text-black hover:bg-slate-100 focus:outline-none"
      }
      href={getLoginUrl()}
    >
      Sign In
    </a>
  )
}

export default LoginButton
