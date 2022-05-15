// @ts-ignore
import CognitoExpress from "cognito-express"
import { NextFunction, Request, Response } from "express"

const cognito = new CognitoExpress({
  region: "us-east-1",
  cognitoUserPoolId: "us-east-1_FTfZtmbGb",
  tokenUse: "access",
})

export function authenticate(req: Request, res: Response, next: NextFunction) {
  let accessTokenFromClient = req.cookies.access

  //Fail if token not present in header.
  if (!accessTokenFromClient) {
    res.status(401).send("Access Token missing from header")
    return
  }

  cognito.validate(accessTokenFromClient, function (err: any, response: Response) {
    //If API is not authenticated, Return 401 with error message.
    if (err) res.status(401).send(err)

    //Else API has been authenticated. Proceed.
    res.locals.user = response
    next()
  })
}
