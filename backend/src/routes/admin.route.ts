import { Router } from "express"
import { deleteFromWaitList, Email, getWaitList } from "../services/user.service"
import { createUser } from "../services/cognito.service"
import { HttpCode } from "../constants/httpCode"
import { RequestWithBody } from "../types/express"

export const adminRoutes = Router()

adminRoutes.get("/waitlist", async (_, res) => {
  res.json(await getWaitList())
})

adminRoutes.post("/createUser", async (req: RequestWithBody<Email>, res) => {
  const resCreateUser = await createUser(req.body.name, req.body.email)
  await deleteFromWaitList(req.body.email)
  if (resCreateUser.code === "UsernameExistsException") {
    res.status(HttpCode.BAD_REQUEST).json("Username has already been created")
  } else {
    res.json("Created user successfully")
  }
})
