import { RequestWithParams } from "../types"
import express, { Router } from "express"
import { getPopularPublishers } from "../services/publisher.service"

export const publisherRoutes = Router()

publisherRoutes.get(
  "/popular",
  async function (req: RequestWithParams<{ id: string }>, res: express.Response) {
    const { id } = req.params
    res.json(await getPopularPublishers())
  }
)
