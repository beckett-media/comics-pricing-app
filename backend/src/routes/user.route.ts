import { Router } from "express"
import * as userService from "../services/user.service"
import { RequestWithBody, RequestWithParams } from "../types"
import axios from "axios"
import * as url from "url"

export const userRoutes = Router()

userRoutes.get("/login", async (req: RequestWithParams<{ code: string }>, res) => {
  try {
    const data = new url.URLSearchParams({
      grant_type: "authorization_code",
      client_id: "2ca9tq8ue0rp1n8vc5ckfh0c40",
      code: req.query.code,
      redirect_uri: "http://localhost:9000/api/user/login/",
    })
    console.log("Data", data.toString())
    const tokens = await axios.post(
      "https://comics.auth.us-east-1.amazoncognito.com/oauth2/token",
      data.toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
    res.cookie("access", tokens.data.access_token)
    res.redirect("http://localhost:3000/dashboard")
  } catch (error: any) {
    res.sendStatus(401)
    console.log(error.response?.data, error.response?.status)
  }
})

userRoutes.post("/waitlist", async (req: RequestWithBody<any>, res) => {
  // TODO: verify all this is correct (use joi probably https://joi.dev/)
  const out = await userService.signup(req.body.email, req.body.name)
  // res.cookie(LOGIN_TOKEN, out.token, { maxAge: out.maxAge })
  res.send(out)
})
