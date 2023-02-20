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
    .withMessage('Email must be valid'), // error message
  body('password')
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage('Password must be between 4 and 20 characters')
],
validateRequest,
async (req: Request, res: Response) => {
  // check existing user
  const { email, password } = req.body
  const existingUser = await User.findOne({ email })
  if(existingUser) {
    throw new BadRequestError('Email in use')
  }

  // create new user
  const user = User.build({ email, password })
  await user.save()

  // Generate JWT
  const userJwt = jwt.sign(
    {
      id: user.id,
      email: user.email
    },
    process.env.JWT_KEY! // "!" tell typescript is ok
  )

  // Store it on session object
  req.session = { jwt: userJwt }

  res.status(201).send(user)
})

export { router as signupRouter }