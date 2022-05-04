import {RequestWithParams} from "../types"
import express, {Router} from "express";
import {getDetails} from "../services/issue.service";

export const issueRoutes = Router()

issueRoutes.get("/:id", async function (req: RequestWithParams<{id: string}>, res: express.Response) {
  const {id} = req.params
  res.json(
    await getDetails(id)
  )
})
