import process from "process"
import VError from "verror"

const NOT_OPERATIONAL_EXIT_STATUS = 0

export const logError = (err: Error): Error => {
  if (err instanceof VError) {
    if (VError.info(err).notOperational) {
      process.exit(NOT_OPERATIONAL_EXIT_STATUS)
    }

    console.error(err.message)
    console.error(err.name)
    console.error(VError.info(err))
    console.trace(VError.fullStack(err))
  } else {
    console.error(`Values: ${JSON.stringify(err)}`)
    console.error(`Stack trace: \n${err.stack}`)
  }

  return err
}
