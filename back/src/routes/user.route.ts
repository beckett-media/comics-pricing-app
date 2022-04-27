import { Router } from "express"
import * as userService from "../services/user.service"
import { LOGIN_TOKEN } from "../constants"
import { RequestWithBody} from "../types"

const userRoutes = Router()
export default userRoutes

userRoutes.post(
  "/login",
  async (req: RequestWithBody<{ email: string; password: string }>, res) => {
    const out = await userService.login(req.body.email, req.body.password)
    // res.cookie(LOGIN_TOKEN, out.token, { maxAge: out.maxAge })
    res.send("Logged In")
  }
)

userRoutes.post("/signup", async (req: RequestWithBody<any>, res) => {
  //Todo verif all this is correct (use joi probably)
  const out = await userService.signup(
    req.body.email,
    req.body.username,
    req.body.password
  )
  // res.cookie(LOGIN_TOKEN, out.token, { maxAge: out.maxAge })
  res.send("Logged In")
})
