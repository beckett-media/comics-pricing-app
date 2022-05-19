import { NextFunction, Request, Response } from "express"
import { HttpCode } from "../constants/httpCode"
import { cognito } from "../loader"

export const TOKEN_USE_CLAIM = "access"

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  const accessToken = req.cookies[TOKEN_USE_CLAIM]

  if (!accessToken) {
    // TODO(michael-sriram): should this say cookie instead?
    res.status(HttpCode.UNAUTHORIZED).send("Access token missing from header")

    return
  }

  // TODO(michael-sriram): is innerRes really a Response if we're assigning it to res.locals.user?
  //                                                                                         ^^^^
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cognito.validate(accessToken, (err: any, innerRes: Response) => {
    if (err) {
      res.status(HttpCode.UNAUTHORIZED).send(err)
      return
    }

    res.locals.user = innerRes

    next()
  })
}
