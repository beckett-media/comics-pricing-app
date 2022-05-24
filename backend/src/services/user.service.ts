import VError from "verror"
import { HttpCode } from "../constants/httpCode"
import { sql } from "../loader"

export type Email = {
  email: string
  name: string
}

export const getWaitList = () => {
  try {
    return sql<Email[]>`
        SELECT email, name FROM emails
    `
  } catch (err) {
    throw new VError(
      {
        name: "DBError",
        info: { code: HttpCode.BAD_REQUEST },
        cause: err as Error,
      },
      "Failed to get wait list",
    )
  }
}

export const deleteFromWaitList = async (email: string) => {
  try {
    return await sql<Email[]>`
      DELETE from emails WHERE email=${email}
      `
  } catch (err) {
    throw new VError(
      {
        name: "DBError",
        info: { code: HttpCode.BAD_REQUEST },
        cause: err as Error,
      },
      "Failed remove user from wait list",
    )
  }
}

export const signup = async (email: string, name: string): Promise<Email[]> => {
  try {
    return await sql<Email[]>`
      INSERT INTO emails
        (email, name)
      VALUES
        (${email}, ${name})
      ON CONFLICT (email) DO NOTHING
    `
  } catch (err) {
    throw new VError(
      {
        name: "DBError",
        info: { code: HttpCode.BAD_REQUEST },
        cause: err as Error,
      },
      "Failed to add email or name",
    )
  }
}
