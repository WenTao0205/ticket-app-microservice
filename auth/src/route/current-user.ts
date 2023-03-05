import express from 'express'
import { currentUser } from '@zwt-tickets/common'
import { User } from '../models/user'

const router = express.Router()

router.get('/api/users/currentuser', currentUser, async (req, res) => {
  let currentUser = null
  if(req.currentUser) currentUser = await User.findById(req.currentUser.id)
  res.send({ currentUser })
})

export { router as currentUserRouter }