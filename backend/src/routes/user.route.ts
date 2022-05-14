import { Router } from "express"
import * as userService from "../services/user.service"
import { RequestWithBody } from "../types"

export const userRoutes = Router()

userRoutes.post(
  "/login",
  async (req: RequestWithBody<{ email: string; password: string }>, res) => {
    const _out = await userService.login(req.body.email, req.body.password)
    // res.cookie(LOGIN_TOKEN, out.token, { maxAge: out.maxAge })
    res.send("Logged In")
  }
)

userRoutes.post("/waitlist", async (req: RequestWithBody<any>, res) => {
  // TODO: verify all this is correct (use joi probably https://joi.dev/)
  const out = await userService.signup(req.body.email, req.body.name)
  // res.cookie(LOGIN_TOKEN, out.token, { maxAge: out.maxAge })
  res.send(out)
})
