const loginUrl =
  "https://comics.auth.us-east-1.amazoncognito.com/oauth2/authorize?client_id=2ca9tq8ue0rp1n8vc5ckfh0c40&response_type=code&scope=email+openid+phone+profile&redirect_uri=http%3A%2F%2Flocalhost%3A9000%2Fapi%2Fuser%2Flogin%2F"

const LoginButton = () => {
  return (
    <a
      className={
        "bg-white hover:bg-slate-100 text-black py-2 px-10 rounded focus:outline-none focus:shadow-outline border-2"
      }
      href={loginUrl}
    >
      Sign In
    </a>
  )
}

export default LoginButton
