import { AxiosError } from "axios"
import { Response, Router } from "express"
import { HttpCode } from "../constants/httpCode"
import { TOKEN_USE_CLAIM } from "../middleware/cognito"
import { Email, signup } from "../services/user.service"
import { RequestWithBody, RequestWithQueryParams } from "types/express"
import { verifyUser } from "../services/cognito.service"

export const userRoutes = Router()

userRoutes.get("/login", async (req: RequestWithQueryParams<{ code: string, state: string }>, res: Response) => {
  if (!req.headers.host) {
    res.status(HttpCode.BAD_REQUEST).send("Host unknown")
    return
  }
  try {
    const { id_token } = await verifyUser(req.query.code, req.protocol, req.headers.host)
    res.cookie(TOKEN_USE_CLAIM, id_token)
    res.redirect(req.query.state)
  } catch (rawErr) {
    res.sendStatus(HttpCode.UNAUTHORIZED).send("Couldn't verify user")

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
  await signup(req.body.email, req.body.name)

  // TODO(michael-sriram): signup() currently returns a list of emails
  res.sendStatus(HttpCode.OK)
})
