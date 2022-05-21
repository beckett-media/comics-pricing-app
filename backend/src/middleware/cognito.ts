import { NextFunction, Request, Response } from "express"
import { HttpCode } from "../constants/httpCode"
import { cognito } from "../loader"

export const TOKEN_USE_CLAIM = "id"

export const authenticate =
  (admin: boolean = false) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies[TOKEN_USE_CLAIM]
    if (!token) {
      // TODO(michael-sriram): should this say cookie instead?
      res.status(HttpCode.UNAUTHORIZED).send("Access token missing from cookies")
      return
    }

    try {
      res.locals.user = await cognito.validate(token)
      if (admin && (!res.locals.user["custom:admin"] || res.locals.user["custom:admin"] === "false")) {
        res.status(HttpCode.UNAUTHORIZED).send("Send")
        return
      }
    } catch (err) {
      res.status(HttpCode.UNAUTHORIZED).send(err)
      return
    }
    next()
  }
