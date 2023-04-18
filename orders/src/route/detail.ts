import express, { Request, Response } from 'express'
import { NotAuthorizedError, NotFoundError, requireAuth } from '@zwt-tickets/common'
import { Order } from '../models/order'

const router = express.Router()

router.get('/api/orders/detail/:orderId', requireAuth, async (req: Request, res: Response) => {
  
  const order = await Order.findById(req.params.orderId).populate('show')
  console.log(order)
  // 检查订单是否存在
  if(!order) throw new NotFoundError()
  // 检查用户访问权限
  if(order.userId !== req.currentUser!.id) throw new NotAuthorizedError()
  

  res.send(order)
})

export { router as detailOrderRouter }