import express, { Request, Response } from 'express'
import { currentUser, requireAuth } from '@zwt-tickets/common'
import { User } from '../models/user'

const router = express.Router()

router.delete('/api/users/deleteuser',
currentUser, requireAuth,
async (req: Request, res: Response) => {
  const ids = req.body

  const deleteCount = await User.deleteMany({
    _id: {
      $in: ids
    }
  })
  
  res.status(200).send(deleteCount)
})

export { router as deleteUser }