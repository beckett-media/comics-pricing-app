import { Request, Response, Router } from "express"
import {
  getIssuePrices,
  getPopularIssues,
  getDetails,
  getRelatedTitles,
  getRelatedIssues,
} from "../services/issue.service"
import { RequestWithParams } from "types/express"

export const issueRoutes = Router()

issueRoutes.get("/popular", async (_req: Request, res: Response) => {
  res.json(await getPopularIssues())
})

issueRoutes.get("/:id", async (req: RequestWithParams<{ id: string }>, res: Response) => {
  res.json(await getDetails(req.params.id))
})

issueRoutes.get("/:id/prices", async (req: RequestWithParams<{ id: string }>, res: Response) => {
  res.json(await getIssuePrices(req.params.id))
})

issueRoutes.get("/:id/related/issues", async (req: RequestWithParams<{ id: string }>, res: Response) => {
  res.json(await getRelatedIssues(req.params.id))
})

issueRoutes.get("/:id/related/titles", async (req: RequestWithParams<{ id: string }>, res: Response) => {
  res.json(await getRelatedTitles(req.params.id))
})
