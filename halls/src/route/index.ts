import express, { Request, Response } from 'express'
import { Hall } from '../models/hall'

const router = express.Router()

router.get('/api/hall', async (req: Request, res: Response) => {
  const halls = await Hall.find({})

  res.status(200).send(halls)
})

export { router as indexHallRouter }