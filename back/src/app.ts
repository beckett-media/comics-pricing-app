import { config } from "dotenv"
import express from "express"
import { load } from "./loader"

config()

const app = express()
load(app)

app.listen(9000, () => console.log("Started on port 9000"))

export { app }
