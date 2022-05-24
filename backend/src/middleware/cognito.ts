import { NextFunction, Request, Response } from "express"
import { HttpCode } from "../constants/httpCode"
import { cognito } from "../loader"

export const TOKEN_USE_CLAIM = "id"

export const authenticate =
  (admin: boolean) =>
    async (req: Request, res: Response, next: NextFunction) => {
      const token = req.cookies[TOKEN_USE_CLAIM]
      if (!token) {
        res.status(HttpCode.UNAUTHORIZED).send("Access token missing from cookies")
        return
      }

      try {
        res.locals.user = await cognito.validate(token)
      } catch (err) {
        res.status(HttpCode.UNAUTHORIZED).send(err)
        return
      }
      if (admin && res.locals.user["custom:admin"] !== "true") {
        res.status(HttpCode.UNAUTHORIZED).send("User is not an admin")
        return
      }
      next()
    }
