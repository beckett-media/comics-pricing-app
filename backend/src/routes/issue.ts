import { RequestWithParams } from "../types"
import express, { Router } from "express"
import {
  getDetails,
  getRelatedIssues,
  getRelatedTitles,
} from "../services/issue.service"

export const issueRoutes = Router()

issueRoutes.get(
  "/:id",
  async function (req: RequestWithParams<{ id: string }>, res: express.Response) {
    const { id } = req.params
    res.json(await getDetails(id))
  }
)

issueRoutes.get(
  "/:id/related/titles",
  async function (req: RequestWithParams<{ id: string }>, res: express.Response) {
    const { id } = req.params
    res.json(await getRelatedTitles(id))
  }
)

issueRoutes.get(
  "/:id/related/issues",
  async function (req: RequestWithParams<{ id: string }>, res: express.Response) {
    const { id } = req.params
    res.json(await getRelatedIssues(id))
  }
)
