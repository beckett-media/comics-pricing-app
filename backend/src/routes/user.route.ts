import axios, { AxiosError } from "axios"
import { Response, Router } from "express"
import querystring from "querystring"
import { HttpCode } from "../constants/httpCode"
import { config } from "../loader"
import { TOKEN_USE_CLAIM } from "../middleware/cognito"
import { signup, Email } from "../services/user.service"
import { RequestWithBody, RequestWithQueryParams } from "../types"

const COGNITO_API_URL = "https://comics.auth.us-east-1.amazoncognito.com/oauth2/token"

export const userRoutes = Router()

userRoutes.get("/login", async (req: RequestWithQueryParams<{ code: string, state: string }>, res: Response) => {
  try {
    console.log("redirect_uri", `${req.protocol}://${req.headers.host}/api/user/login/`)
    console.log("query", req.query)

    const cognitoRes = await axios.post(
      COGNITO_API_URL,
      querystring.stringify({
        grant_type: "authorization_code",
        client_id: config.cognitoClientId,
        code: req.query.code,
        redirect_uri: `${req.protocol}://${req.headers.host}/api/user/login/`,
      })
    )

    res.cookie(TOKEN_USE_CLAIM, cognitoRes.data.access_token)
    res.redirect(req.query.state)
  } catch (rawErr) {
    // TODO(michael-sriram): do we want to send a message with this response like the other instances of UNAUTHORIZED?
    res.sendStatus(HttpCode.UNAUTHORIZED)

    const err = rawErr as AxiosError

    if (err.response) {
      console.error(err.response.data, err.response.status)
    } else if (err.request) {
      console.error(err.request)
    } else {
      console.error(err.message)
    }

    console.error(err.config)
  }
})

userRoutes.post("/waitlist", async (req: RequestWithBody<Email>, res) => {
  // TODO(sriram): verify all this is correct (use joi probably https://joi.dev/)
  /* const _out = */ await signup(req.body.email, req.body.name)

  // res.cookie(LOGIN_TOKEN, out.token, { maxAge: out.maxAge })
  // TODO(michael-sriram): signup() currently returns a list of emails
  // res.send(out)
  res.sendStatus(HttpCode.OK)
})
