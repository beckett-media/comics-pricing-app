import {logError} from "./util/errorHandling"
import express, {ErrorRequestHandler, Express} from "express"
import {HttpCode} from "./constants/httpCode"
import logger from "morgan"
import cookieParser from "cookie-parser"
import {router as testAPIRouter} from "./routes/testAPI"
import userRoutes from "./routes/user.route"
import VError from "verror"
import {createClient, SupabaseClient} from '@supabase/supabase-js'

const setupRoutes = (app: Express) => {
  const apiRouter = express.Router()
  app.use("/api", apiRouter)
  apiRouter.use("/testAPI", testAPIRouter)
  apiRouter.use("/user", userRoutes)
}

export let supabase: SupabaseClient
export const load = (app: Express) => {
  // Error handling middleware, we delegate the handling to the centralized error handler

  app.use(logger("dev"))
  app.use(express.json())
  app.use(express.urlencoded({extended: false}))
  app.use(cookieParser())
  app.use(((e, req, res, _) => {
    logError(e)
    if (e instanceof VError) {
      res.status(VError.info(e).code ?? 500).send(e)
    } else res.status(HttpCode.SERVER_ERROR).send(e)
  }) as ErrorRequestHandler)

  const supabaseUrl = process.env.SUPABASE_KEY!
  const supabaseKey = process.env.SUPABASE_KEY!

  const options = {
    schema: 'public',
    headers: {'x-my-custom-header': 'pira-chat'},
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
  supabase = createClient(supabaseUrl, supabaseKey, options)
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
