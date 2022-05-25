import { Request, Response, Router } from "express"
import {
  getIssuePrices,
  getPopularIssues,
  getDetails,
  getNewComics,
  getRecentPriceDrops,
  getRelatedTitles,
  getRelatedIssues,
  getTrendingIssues,
} from "../services/issue.service"
import { RequestWithParams } from "types/express"

export const issueRoutes = Router()

issueRoutes.get("/popular", async (_req: Request, res: Response) => {
  res.json(await getPopularIssues())
})

issueRoutes.get('/trending', async (_req: Request, res: Response)=> {
  res.json(await getTrendingIssues())
})

issueRoutes.get('/new-comics', async (_req: Request, res: Response)=> {
  res.json(await getNewComics())
})

issueRoutes.get('/recent-price-drops', async (_req: Request, res: Response)=> {
  res.json(await getRecentPriceDrops())
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


