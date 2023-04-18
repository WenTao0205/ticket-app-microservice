import express, { Request, Response } from 'express'
import { NotFoundError, requireAuth } from '@zwt-tickets/common'
import { Order } from '../models/order'
import { OrderStatus } from '@zwt-tickets/common'
import { OrderCancelledPublisher } from '../events/publisher/order-cancelled-publisher'
import { natsWrapper } from '../nats-wrapper'

const router = express.Router()

router.delete('/api/orders/deleteAdmin/:orderId', requireAuth, async (req: Request, res: Response) => {
  const { orderId } = req.params
  const order = await Order.findById(orderId).populate('show')
  
  // 检查订单是否存在
  if(!order) throw new NotFoundError()

  order.status = OrderStatus.Cancelled
  await order.save()

  new OrderCancelledPublisher(natsWrapper.client).publish({
    id: order.id,
    version: order.version,
    seat: order.seat,
    showId: order.show.id
  })

  res.status(201).send(order)
})

export { router as deleteOrderAdminRouter }