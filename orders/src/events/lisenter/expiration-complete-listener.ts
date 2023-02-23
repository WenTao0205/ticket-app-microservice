import { Listener, Subjects, OrderStatus } from "@zwt-tickets/common"
import { Message } from "node-nats-streaming"
import { Order } from "../../models/order"
import { OrderCancelledPublisher } from "../publisher/order-cancelled-publisher"

export class ExpirationCompleteListener extends Listener {
  subject = Subjects.ExpirationComplete
  queueGroupName = 'orders-service'

  async onMessage(data: any, msg: Message) {
    const order = await Order.findById(data.orderId)

    if(!order) throw new Error('Order not found')
    if(order.status === OrderStatus.Complete) return msg.ack()

    order.set({
      status: OrderStatus.Cancelled
    })
    await order.save()

    await new OrderCancelledPublisher(this.client).publish({
      id: order.id,
      version: order.version,
      ticket: {
        id: order.ticket.id.toString('hex')
      }
    })

    msg.ack()
  }
}