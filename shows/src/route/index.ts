import express, { Request, Response } from 'express'
import { Show } from '../model/show'

const router = express.Router()

router.post('/api/show',
async (req: Request, res: Response) => {
  const condition = req.body
  for(let key in condition) condition[key] = new RegExp(condition[key])
  const shows = await Show.find(condition).populate('hall')

  res.status(200).send(shows)
})

export { router as indexShowRouter }