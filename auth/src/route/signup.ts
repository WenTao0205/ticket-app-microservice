import express, { Request, Response } from 'express'
import { body, validationResult } from 'express-validator' // lib -> check request
import jwt from 'jsonwebtoken'

import { BadRequestError, validateRequest } from '@zwt-tickets/common'
import { User } from '../models/user'

const router = express.Router()

router.post(
'/api/users/signup',
[ // middleware
  body('email') // Only Check req.body
    .isEmail() // Sanitization (净化函数)
    .withMessage('邮箱格式错误'), // error message
  body('password')
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage('密码长度在4到20个字符'),
  body('username')
    .notEmpty()
    .withMessage('用户名不能为空')
],
validateRequest,
async (req: Request, res: Response) => {
  // check existing user (username?)
  const { email, password, username } = req.body
  const existingUser = await User.findOne({ email })
  if(existingUser) throw new BadRequestError('邮箱已被使用')

  // create new user
  const user = User.build({ email, password, username })
  await user.save()

  // Generate JWT
  const userJwt = jwt.sign(
    {
      id: user.id,
      username: user.username,
      email: user.email,
      sex: user.sex,
      birthDate: user.birthDate,
      personalIntro: user.personalIntro,
      createAt: user.createdAt,
      updateAt: user.updatedAt
    },
    process.env.JWT_KEY! // "!" tell typescript is ok
  )

  // Store it on session object
  req.session = { jwt: userJwt }

  res.status(201).send(user)
})

export { router as signupRouter }