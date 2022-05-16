import { Request, Response, Router } from "express"
import { HttpCode } from "../constants/httpCode"

export const healthCheckRoutes = Router()

healthCheckRoutes.get("/", (_req: Request, res: Response) => {
  res.sendStatus(HttpCode.OK)
})
