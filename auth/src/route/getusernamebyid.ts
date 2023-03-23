import express, { Request, Response } from 'express'
import { NotFoundError } from '@zwt-tickets/common'
import { User } from '../models/user'

const router = express.Router()

router.get('/api/users/getusernamebyid/:id',
async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id)
  if(!user) throw new NotFoundError()

  res.status(200).send({ username: user.username })
})

export { router as getUserNameById }