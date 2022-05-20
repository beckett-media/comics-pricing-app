import { NextFunction, Request, Response } from "express"
import { HttpCode } from "../constants/httpCode"
import { cognito } from "../loader"

export const TOKEN_USE_CLAIM = "access"

export const authenticate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const accessToken = req.cookies[TOKEN_USE_CLAIM]

  if (!accessToken) {
    // TODO(michael-sriram): should this say cookie instead?
    res.status(HttpCode.UNAUTHORIZED).send("Access token missing from header")

    return
  }

  let user

  try {
    user = await cognito.validate(accessToken)
  } catch (err) {
    // TODO(michael-sriram): do we want to send error as is directly back to client?
    res.status(HttpCode.UNAUTHORIZED).send(err)
    return
  }

  res.locals.user = user

  next()
}
