import express, { Request, Response } from 'express'
import { Hall } from '../models/hall'

const router = express.Router()

router.post('/api/hall/gethall', async (req: Request, res: Response) => {
  const condition = req.body
  for(let key in condition) condition[key] = new RegExp(condition[key])
  const halls = await Hall.find(condition)

  res.status(200).send(halls)
})

export { router as indexHallRouter }