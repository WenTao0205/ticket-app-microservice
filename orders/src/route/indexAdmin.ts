import express, { Request, Response } from 'express'
import { requireAuth } from '@zwt-tickets/common'
import { Order } from '../models/order'

const router = express.Router()

router.get('/api/orders/indexAdmin', requireAuth, async (req: Request, res: Response) => {
  const orders = await Order.find({}).populate('show')

  res.send(orders)
})

export { router as indexOrderAdminRouter }