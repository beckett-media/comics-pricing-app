import express from "express"
import { RequestWithBody } from "../types"

export const testAPIRoutes = express.Router()


testAPIRoutes.get("/", function(
  req: RequestWithBody<null>,
  res: express.Response,
) {
  res.send("API is working properly")
})
