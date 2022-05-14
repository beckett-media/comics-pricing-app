import jwt from "jsonwebtoken"
import { HttpCode } from "../constants/httpCode"
import { sql } from "../loader"
import VError from "verror"

type Email = {
  email: string
  name: string
}

const _saltRounds = 10

const _genToken = (email: string): any => {
  const options = { expiresIn: 1000 * 60 * 60 * 24 }
  return {
    token: jwt.sign({ email }, process.env.JWT_SECRET!, options),
    maxAge: options.expiresIn,
  }
}

export const login = async (_email: string, _password: string): Promise<void> => {
  let userInfo
  try {
    null
  } catch (e) {
    throw new VError(
      {
        name: "DBError",
        info: { code: HttpCode.BAD_REQUEST },
        cause: e as Error,
      },
      "Failed searching database"
    )
  }

  if (!userInfo)
    throw new VError(
      {
        name: "DBError",
        info: { code: HttpCode.BAD_REQUEST },
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

export const signup = async (email: string, name: string): Promise<Email[]> => {
  try {
    return sql<Email[]>`
        INSERT INTO emails
            (email, name)
        VALUES
            (${email}, ${name})
        ON CONFLICT (email) DO NOTHING
    `
  } catch (e) {
    throw new VError(
      {
        name: "DBError",
        info: { code: HttpCode.BAD_REQUEST },
        cause: e as Error,
      },
      "Failed to add email or name"
    )
  }
}
