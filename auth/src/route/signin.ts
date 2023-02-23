import express, { Request, Response } from 'express'
import { body, validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'

import { User } from '../models/user'
import { Password } from '../services/password'
import { validateRequest, BadRequestError } from '@zwt-tickets/common'
// import { validateRequest } from '../middlewares/validate-request'
// import { BadRequestError } from '../errors/bad-request-error'

const router = express.Router()

router.post('/api/users/signin',
[
  body('email')
    .isEmail()
    .withMessage('邮箱格式错误'),
  body('password')
    .trim()
    .notEmpty()
    .withMessage('需要密码')
],
validateRequest,
async (req: Request, res: Response) => {
  const { email, password } = req.body

  const existingUser = await User.findOne({ email })
  if(!existingUser) {
    throw new BadRequestError('邮箱不存在')
  }

  const passwordMatch = await Password.compare(existingUser.password, password)
  if(!passwordMatch) {
    throw new BadRequestError('密码错误')
  }

  // Generate JWT
  const userJwt = jwt.sign(
    {
      id: existingUser.id,
      email: existingUser.email
    },
    process.env.JWT_KEY! // "!" tell typescript is ok
  )

  // Store it on session object
  req.session = { jwt: userJwt }

  res.status(201).send(existingUser)
})

export { router as signinRouter }