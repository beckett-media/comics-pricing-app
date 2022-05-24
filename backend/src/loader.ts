// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import CognitoExpress from "cognito-express"
import cookieParser from "cookie-parser"
import express, { Application, ErrorRequestHandler, Router } from "express"
import logger from "morgan"
import postgres from "postgres"
import VError from "verror"
import { configFromEnv } from "./util/config"
import { HttpCode } from "./constants/httpCode"
import { authenticate, TOKEN_USE_CLAIM } from "./middleware/cognito"
import { issueRoutes } from "./routes/issue.route"
import { healthCheckRoutes } from "./routes/healthCheck.route"
import { authRoutes } from "./routes/auth.route"
import { publisherRoutes } from "./routes/publisher.route"
import { titleRoutes } from "./routes/title.route"
import { userRoutes } from "./routes/user.route"
import { logError } from "./util/errorHandling"
import { adminRoutes } from "./routes/admin.route"
import AWS from "aws-sdk"
import process from "process"

const UNCAUGHT_EXCEPTION_EXIT_STATUS = 1

const appRouter = (): Router => {
  const router = Router()

  const [regularAuth, adminAuth] = [authenticate(false), authenticate(true)]
  router.use("/auth", regularAuth, authRoutes)
  router.use("/publisher", regularAuth, publisherRoutes)
  router.use("/issue", regularAuth, issueRoutes)
  router.use("/title", regularAuth, titleRoutes)
  router.use("/user", userRoutes)
  router.use("/admin", adminAuth, adminRoutes)
  return router
}

export const createApp = (): Application => {
  const app = express()

  app.use(logger("dev"))
  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))
  app.use(cookieParser())

  app.use("/", healthCheckRoutes)
  app.use("/api", appRouter())
  app.set("trust proxy", true)
  app.use(((err, _req, res, _next) => {
    logError(err)

    const status = err instanceof VError ? VError.info(err).code ?? HttpCode.SERVER_ERROR : HttpCode.SERVER_ERROR
    res.status(status).send(err.message)
  }) as ErrorRequestHandler)

  return app
}

process.on("unhandledRejection", (err: Error) => {
  console.error("Unhandled Rejection")

  throw err
})

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

AWS.config.update({
  region: config.region,
  accessKeyId: config.accessKeyId,
  secretAccessKey: config.secretAccessKey,
})
export const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider()
