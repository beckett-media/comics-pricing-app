import { Request, Response, Router } from "express"
import { getPopularTitles } from "../services/title.service"

export const titleRoutes = Router()

titleRoutes.get("/popular", async (_req: Request, res: Response) => {
  res.json(await getPopularTitles())
})
