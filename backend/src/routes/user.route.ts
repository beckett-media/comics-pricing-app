import { AxiosError } from "axios"
import { Response, Router } from "express"
import { HttpCode } from "../constants/httpCode"
import { TOKEN_USE_CLAIM } from "../middleware/cognito"
import {
  deleteFromWaitList,
  Email,
  getWaitList,
  signup,
} from "../services/user.service"
import { RequestWithBody, RequestWithQueryParams } from "../types"
import { createUser, verifyUser } from "../services/cognito.service"

export const userRoutes = Router()

userRoutes.get("/login", async (req: RequestWithQueryParams<{ code: string }>, res: Response) => {
  try {
    const { access_token } = await verifyUser(req.query.code)
    res.cookie(TOKEN_USE_CLAIM, access_token)
    // TODO(michael): include redirect url in request query params?
    res.redirect("http://localhost:3000/dashboard")
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

userRoutes.get("/waitlist", async (_, res) => {
  const waitList = await getWaitList()
  console.log(waitList)
  res.json(waitList)
})

userRoutes.post("/createUser", async (req: RequestWithBody<Email>, res) => {
  await createUser(req.body.name, req.body.email)
  await deleteFromWaitList(req.body.email)
  res.json("Created user successfully")
})

userRoutes.post("/waitlist", async (req: RequestWithBody<Email>, res) => {
  // TODO(sriram): verify all this is correct (use joi probably https://joi.dev/)
  /* const _out = */
  await signup(req.body.email, req.body.name)

  // res.cookie(LOGIN_TOKEN, out.token, { maxAge: out.maxAge })
  // TODO(michael-sriram): signup() currently returns a list of emails
  // res.send(out)
  res.sendStatus(HttpCode.OK)
})
