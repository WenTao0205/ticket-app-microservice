import express, { Request, Response } from 'express'

import { currentUser, requireAuth } from '@zwt-tickets/common'
import { User } from '../models/user'

const router = express.Router()

router.post('/api/users',
currentUser,
requireAuth,
async (req: Request, res: Response) => {
  const users = await User.find(req.body)

  res.status(200).send(users)
}
)

export { router as getAllUsers }