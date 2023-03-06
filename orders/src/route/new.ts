import express, { Request, Response } from 'express'
import { BadRequestError, NotFoundError, OrderStatus, requireAuth, validateRequest } from '@zwt-tickets/common'
import { body } from 'express-validator'
import { Show } from '../models/show'
import { Order } from '../models/order'
import { OrderCreatedPublisher } from '../events/publisher/order-created-publisher'
import { natsWrapper } from '../nats-wrapper'

const router = express.Router()

const EXPIRATION_WINDOW_SECONDS = 15 * 60

router.post('/api/orders',
requireAuth,
[
  body('showId')
    .notEmpty()
    .withMessage('ShowId must be provided'),
  body('seat')
    .notEmpty()
    .withMessage('seat must be provided')
    .isArray()
    .withMessage('seat must be a array')
],
validateRequest,
async (req: Request, res: Response) => {
  const { showId, seat, price } = req.body

  // 确保下单的票存在
  const show = await Show.findById(showId)
  if(!show) throw new NotFoundError()

  // 确保座位没有被选
  for(let i of seat) {
    if(show.selectedSeat?.includes(i)) throw new BadRequestError('有座位已被预订，请重新选购')
  }
  for(let i of seat) show.selectedSeat?.push(i)
  await show.save()

  // 计算订单过期时间
  const expiration = new Date()
  expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS)

  // 创建订单，存储到数据库
  const order = Order.build({
    userId: req.currentUser!.id,
    status: OrderStatus.Created,
    expiresAt: expiration,
    price,
    seat,
    show
  })
  await order.save()

  console.log(order.expiresAt.toISOString())
  console.log(new Date(order.expiresAt.toISOString()).getTime())

  // 发布事件: 创建订单
  new OrderCreatedPublisher(natsWrapper.client).publish({
    id: order.id,
    status: order.status,
    userId: order.userId,
    seat: order.seat,
    expriesAt: order.expiresAt.toISOString(),
    version: order.version,
    showId: order.show.id
  })

  res.status(201).send(order)
})

export { router as newOrderRouter }