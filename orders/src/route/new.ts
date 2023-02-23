import express, { Request, Response } from 'express'
import { BadRequestError, NotFoundError, OrderStatus, requireAuth, validateRequest } from '@zwt-tickets/common'
import { body } from 'express-validator'
import { Ticket } from '../models/ticket'
import { Order } from '../models/order'
import { OrderCreatedPublisher } from '../events/publisher/order-created-publisher'
import { natsWrapper } from '../nats-wrapper'

const router = express.Router()

const EXPIRATION_WINDOW_SECONDS = 1 * 15

router.post('/api/orders',
requireAuth,
[
  body('ticketId')
    .not()
    .isEmpty()
    .withMessage('TicketId must be provided'),
],
validateRequest,
async (req: Request, res: Response) => {
  const { ticketId } = req.body

  // 确保下单的票存在
  const ticket = await Ticket.findById(ticketId)
  if(!ticket) throw new NotFoundError()

  // 确保票没有被下单
  const existingOrder = await Order.findOne({
    ticket: ticket,
    status: {
      $in: [
        OrderStatus.Created,
        OrderStatus.AwaitingPayment,
        OrderStatus.Complete
      ]
    }
  })
  if(existingOrder) throw new BadRequestError('该张票被已下单')

  // 计算订单过期时间
  const expiration = new Date()
  expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS)

  // 创建订单，存储到数据库
  const order = Order.build({
    userId: req.currentUser!.id,
    status: OrderStatus.Created,
    expiresAt: expiration,
    ticket
  })
  await order.save()

  console.log(order.expiresAt.toISOString())
  console.log(new Date(order.expiresAt.toISOString()).getTime())

  // 发布事件: 创建订单
  new OrderCreatedPublisher(natsWrapper.client).publish({
    id: order.id,
    status: order.status,
    userId: order.userId,
    expriesAt: order.expiresAt.toISOString(),
    version: order.version,
    ticket: {
      id: ticket.id,
      price: ticket.price
    }
  })

  res.status(201).send(order)
})

export { router as newOrderRouter }