import express, { Response } from "express"
import {RequestWithBody} from "../types";
export const router = express.Router()


router.get("/", function (
  req: RequestWithBody<null>,
  res: express.Response,
  next: any
) {
  res.send("API is working properly")
})
