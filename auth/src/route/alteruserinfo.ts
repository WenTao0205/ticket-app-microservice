import express, { Request, Response } from 'express'
import { currentUser, requireAuth, NotFoundError } from '@zwt-tickets/common'
import { User } from '../models/user'

const router = express.Router()

router.put('/api/users/alteruserinfo',
currentUser, requireAuth,
async (req: Request, res: Response) => {
  const { id, username, sex, birthDate, personalIntro } = req.body
  const user = await User.findById(id)
  
  if(!user) throw new NotFoundError()

  user.set({
    username, sex, birthDate, personalIntro
  })
  await user.save()
  
  res.status(200).send(user)
}
)

export { router as alterUserInfo }