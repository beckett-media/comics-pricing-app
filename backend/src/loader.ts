import { logError } from "./util/errorHandling"
import express, { ErrorRequestHandler, Express } from "express"
import { HttpCode } from "./constants/httpCode"
import logger from "morgan"
import cookieParser from "cookie-parser"
import { testAPIRoutes } from "./routes/testAPI"
import { userRoutes } from "./routes/user.route"
import VError from "verror"
import postgres from "postgres"
import { issueRoutes } from "./routes/issue"
import { config } from "dotenv"
import { authenticate } from "./middleware/cognito"

config()

export const sql = postgres({
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
})

const setupRoutes = (app: Express) => {
  const apiRouter = express.Router()
  app.use("/api", apiRouter)
  apiRouter.use("/testAPI", testAPIRoutes)
  apiRouter.use("/user", userRoutes)
  apiRouter.use("/issue", authenticate, issueRoutes)
}

export const load = (app: Express) => {
  // Error handling middleware, we delegate the handling to the centralized error handler
  app.use(logger("dev"))
  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))
  app.use(cookieParser())
  app.use(((e, req, res, _) => {
    logError(e)
    if (e instanceof VError) {
      res.status(VError.info(e).code ?? 500).send(e)
    } else res.status(HttpCode.SERVER_ERROR).send(e)
  }) as ErrorRequestHandler)

  setupRoutes(app)
}

process.on("unhandledRejection", error => {
  // I just caught an unhandled promise rejection,
  // since we already have fallback handler for unhandled errors (see below),
  // let throw and let him handle that
  console.log("unhandled Rejection")
  throw error
})

process.on("uncaughtException", (error: Error) => {
  // I just received an error that was never handled, time to handle it and then decide whether a restart is needed
  logError(error)
  process.exit(1)
})
