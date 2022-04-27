// centralized error object that derives from Node’s Error
import { HttpCode } from "../constants/httpCode"
import VError from "verror"

/** @deprecated */
class AppError extends Error {
  public readonly name: string
  public readonly httpCode: number
  public readonly isOperational: boolean

  constructor(
    name: string,
    httpCode: HttpCode,
    description: string = "",
    isOperational: boolean = true
  ) {
    super(description)

    Object.setPrototypeOf(this, new.target.prototype) // restore prototype chain

    this.name = name
    this.httpCode = httpCode
    this.isOperational = isOperational

    Error.captureStackTrace(this)
  }
}

export function logError(err: Error) {
  if (err instanceof VError) {
    if (VError.info(err).notOperational) {
      process.exit(0)
    }
    console.log(err.message)
    console.log(err.name)
    console.log(VError.info(err))
    console.trace(VError.fullStack(err))
  } else {
    console.log("Values: " + JSON.stringify(err))
    console.log("Stack trace: \n" + err.stack)
  }
  return err
  // await sendMailToAdminIfCritical();
  // await saveInOpsQueueIfCritical();
  // await determineIfOperationalError();
}

// export class ErrorHandler {
//     public async handleError(err: Error): Promise<void> {
//          console.log(err);
//         // await sendMailToAdminIfCritical();
//         // await saveInOpsQueueIfCritical();
//         // await determineIfOperationalError();
//     };
// }
//
