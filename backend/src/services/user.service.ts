import jwt from "jsonwebtoken"
import {HttpCode} from "../constants/httpCode"
import { sql } from "../loader"
import VError from "verror"

const saltRounds = 10

const genToken = (email: string) => {
  const options = {expiresIn: 1000 * 60 * 60 * 24}
  return {
    token: jwt.sign({email}, process.env.JWT_SECRET!, options),
    maxAge: options.expiresIn,
  }
}

export const login = async (email: string, password: string) => {
  let userInfo
  try {

  } catch (e) {
    throw new VError(
      {
        name: "DBError",
        info: {code: HttpCode.BAD_REQUEST},
        cause: e as Error
      },
      "Failed searching database"
    )
  }

  if (!userInfo)
    throw new VError(
      {
        name: "DBError",
        info: {code: HttpCode.BAD_REQUEST},
      },
      "Email not found"
    )
  // const match = await bcrypt.compare(password, userInfo.password)
  // if (!match) {
  //   throw new VError(
  //     {
  //       name: "DBError",
  //       info: {code: HttpCode.BAD_REQUEST},
  //     },
  //     "Password incorrect"
  //   )
  // }
  // return genToken(userInfo.email)
}

export const signup = async (email: string, username: string) => {
  const issues = await sql`select * from users limit 10`
  console.log(issues)
  // try {
  //   // const existingUser = await UserModel.findOne({email})
  //   if (!existingUser) {
  //     await UserModel.create({
  //       email,
  //       username,
  //       password: await bcrypt.hash(password, saltRounds),
  //     })
  //     return genToken(email)
  //   }
  // } catch (e) {
  //   throw new VError(
  //     {
  //       name: "DBError",
  //       info: {code: HttpCode.SERVER_ERROR},
  //       cause: e,
  //     },
  //     "Failed creating account"
  //   )
  // }
  // throw new VError(
  //   {
  //     name: "DBError",
  //     info: {code: HttpCode.BAD_REQUEST},
  //   },
  //   "User already exists"
  // )
}
