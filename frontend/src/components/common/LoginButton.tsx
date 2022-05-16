const loginUrl =
  "https://comics.auth.us-east-1.amazoncognito.com/oauth2/authorize?client_id=2ca9tq8ue0rp1n8vc5ckfh0c40&response_type=code&scope=email+openid+phone&redirect_uri=http%3A%2F%2Flocalhost%3A9000%2Fapi%2Fuser%2Flogin%2F"

const LoginButton = () => {
  return (
    <a
      className={
        "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      }
      href={loginUrl}
    >
      Login
    </a>
  )
}

export default LoginButton
