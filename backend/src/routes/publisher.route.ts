import express, { Router } from "express"
import { getPopularPublishers } from "../services/publisher.service"

export const publisherRoutes = Router()

publisherRoutes.get(
  "/popular",
  async function (req: express.Request, res: express.Response) {
    res.json(await getPopularPublishers())
  }
)
