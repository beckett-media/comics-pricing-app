import { Response, Router } from "express"
import { getDetails, getRelatedTitles, getRelatedIssues } from "../services/issue.service"
import { RequestWithParams } from "../types"

export const issueRoutes = Router()

issueRoutes.get("/:id", async (req: RequestWithParams<{ id: string }>, res: Response) => {
  res.json(await getDetails(req.params.id))
})

issueRoutes.get("/:id/related/issues", async (req: RequestWithParams<{ id: string }>, res: Response) => {
  res.json(await getRelatedTitles(req.params.id))
})

issueRoutes.get("/:id/related/titles", async (req: RequestWithParams<{ id: string }>, res: Response) => {
  res.json(await getRelatedIssues(req.params.id))
})
