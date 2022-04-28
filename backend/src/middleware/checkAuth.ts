import jwt = require("express-jwt")
import {Request} from "express"
import {config} from "dotenv"
// process.env.JWT_SECRET hasn't loaded at this point
//there's a probably a better way but this should work
config()
const getTokenFromHeader = (req: Request) => {
  return req.cookies.token
}

export const checkAuth = jwt({
  secret: process.env.JWT_SECRET!, // The _secret_ to sign the JWTs
  getToken: getTokenFromHeader, // How to extract the JWT from the request
  algorithms: ['HS256']
})
