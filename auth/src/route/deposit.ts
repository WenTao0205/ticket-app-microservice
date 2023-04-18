import express, { Request, Response } from 'express'
import { currentUser, requireAuth, NotFoundError } from '@zwt-tickets/common'
import { User } from '../models/user'

const router = express.Router()

router.put('/api/users/deposit',
currentUser, requireAuth,
async (req: Request, res: Response) => {
  const { id, amount } = req.body
  const user = await User.findById(id)
  
  if(!user) throw new NotFoundError()

  user.set({ balance: user.balance! + amount })
  await user.save()
  
  res.status(200).send(user)
}
)

export { router as deposit }