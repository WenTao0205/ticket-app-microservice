import express, { Request, Response } from 'express'
import { NotAuthorizedError, NotFoundError, requireAuth } from '@zwt-tickets/common'
import { Order } from '../models/order'
import { OrderStatus } from '@zwt-tickets/common'

const router = express.Router()

router.put('/api/orders/:orderId', requireAuth, async (req: Request, res: Response) => {
  const { orderId } = req.params
  const order = await Order.findById(orderId).populate('show')
  
  // 检查订单是否存在
  if(!order) throw new NotFoundError()
  if(order.userId !== req.currentUser!.id) throw new NotAuthorizedError()

  order.status = OrderStatus.Complete
  await order.save()

  res.status(201).send(order)
})

export { router as completeOrderRouter }