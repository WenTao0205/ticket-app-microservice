import express, { Request, Response } from 'express'
import { body } from 'express-validator'
import jwt from 'jsonwebtoken'
import { Password } from '../services/password'

import { Admin } from '../model/admin'
import { validateRequest, BadRequestError } from '@zwt-tickets/common'

const router = express.Router()

router.post('/api/admin/signin',
[
  body('username')
    .notEmpty()
    .withMessage('需要用户名'),
  body('password')
    .trim()
    .notEmpty()
    .withMessage('需要密码')
],
validateRequest,
async (req: Request, res: Response) => {
  const { username, password } = req.body

  const existingUser = await Admin.findOne({ username })
  if(!existingUser) throw new BadRequestError('管理员不存在')

  const passwordMatch = await Password.compare(existingUser.password, password)
  if(!passwordMatch) throw new BadRequestError('密码错误')

  // Generate JWT
  const userJwt = jwt.sign(
    {
      id: existingUser.id,
      username: existingUser.username
    },
    process.env.JWT_KEY! // "!" tell typescript is ok
  )

  // Store it on session object
  req.session = { jwt: userJwt }

  res.status(201).send(existingUser)
})

export { router as signinRouter }