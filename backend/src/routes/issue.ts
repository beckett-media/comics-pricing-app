import { RequestWithBody } from "../types"
import express, { Router } from "express";
import { sql } from "../loader"

export const issueRoutes = Router()

issueRoutes.get("/", async function(req: RequestWithBody<null>, res: express.Response) {
  const issues = await sql`select * from issues limit 10`
  res.json(issues)
})
