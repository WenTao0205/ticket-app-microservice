import express, { Request, Response } from 'express'

import { currentUser, requireAuth } from '@zwt-tickets/common'
import { User } from '../models/user'

const router = express.Router()

router.post('/api/users',
currentUser,
requireAuth,
async (req: Request, res: Response) => {
  const condition = req.body
  for(let key in condition) condition[key] = new RegExp(condition[key])
  const users = await User.find(condition)

  res.status(200).send(users)
}
)

export { router as getAllUsers }