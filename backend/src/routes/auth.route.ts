import { Request, Response, Router } from "express"

import { HttpCode } from "../constants/httpCode"

export const authRoutes = Router()

authRoutes.get("/check", async (_req: Request, res: Response) => {
  res.sendStatus(HttpCode.OK)
})
