import jwt from "jsonwebtoken"
import {HttpCode} from "../constants/httpCode"
import { sql } from "../loader"
import VError from "verror"

type Emails = {
  email: string,
  name: string
}

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

export const signup = async (email: string, name: string) => {
  try {
    return sql<Emails[]>`
        INSERT INTO emails
            (email, name)
        VALUES
            (${email}, ${name})
        RETURNING
            email, name
        ON CONFLICT DO NOTHING/UPDATE
    `;
  } catch (e) {
    
  }

  // return sql<EmailsDetails[]>`
  //   insert into emails
  //     (email, name)
  //   values
  //     (${ email }, ${ name })
  //   returning email, name
  // `;
}
