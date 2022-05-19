// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import CognitoExpress from "cognito-express"
import cookieParser from "cookie-parser"
import cors from "cors"
import express, { Application, ErrorRequestHandler, Router } from "express"
import logger from "morgan"
import postgres from "postgres"
import VError from "verror"
import { configFromEnv } from "./config"
import { HttpCode } from "./constants/httpCode"
import { authenticate, TOKEN_USE_CLAIM } from "./middleware/cognito"
import { issueRoutes } from "./routes/issue.route"
import { healthCheckRoutes } from "./routes/healthCheck.route"
import { publisherRoutes } from "./routes/publisher.route"
import { titleRoutes } from "./routes/title.route"
import { userRoutes } from "./routes/user.route"
import { logError } from "./util/errorHandling"

const UNCAUGHT_EXCEPTION_EXIT_STATUS = 1

const appRouter = (): Router => {
  const router = Router()

  router.use("/publisher", authenticate, publisherRoutes)
  router.use("/issue", authenticate, issueRoutes)
  router.use("/title", authenticate, titleRoutes)
  router.use("/user", userRoutes)

  return router
}

export const createApp = (): Application => {
  const app = express()

  app.use(logger("dev"))
  app.use(cors({
    origin: "https://comicsprice.guide",
    credentials: true,
    optionsSuccessStatus: 200,
  }))
  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))
  app.use(cookieParser())
  app.use(((err, _req, res, _next) => {
    logError(err)

    const status = err instanceof VError ? VError.info(err).code ?? HttpCode.SERVER_ERROR : HttpCode.SERVER_ERROR

    // TODO(michael-sriram): do we want to send error as is directly back to client?
    res.status(status).send(err)
  }) as ErrorRequestHandler)

  app.use("/", healthCheckRoutes)
  app.use("/api", appRouter())

  return app
}

// TODO(michael-sriram): is this the right way to handle unhandled rejections?
process.on("unhandledRejection", (err: Error) => {
  console.error("Unhandled Rejection")

  throw err
})

// TODO(michael-sriram): is this the right way to handle unhandled exceptions?
process.on("uncaughtException", (err: Error) => {
  logError(err)
  process.exit(UNCAUGHT_EXCEPTION_EXIT_STATUS)
})

export const config = configFromEnv()
export const cognito = new CognitoExpress({
  region: config.cognitoAwsRegion,
  cognitoClientId: config.cognitoClientId,
  cognitoUserPoolId: config.cognitoUserPoolId,
  tokenUse: TOKEN_USE_CLAIM,
})
export const sql = postgres({
  host: config.dbHost,
  username: config.dbUsername,
  password: config.dbPassword,
  database: config.dbName,
})
