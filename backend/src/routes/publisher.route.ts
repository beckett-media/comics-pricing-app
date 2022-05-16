import { Request, Response, Router } from "express"
import { getPopularPublishers } from "../services/publisher.service"

export const publisherRoutes = Router()

publisherRoutes.get("/popular", async (_req: Request, res: Response) => {
  res.json(await getPopularPublishers())
})
