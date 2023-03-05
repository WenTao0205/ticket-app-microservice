import { Listener, Subjects, OrderStatus, NotFoundError } from "@zwt-tickets/common"
import { Message } from "node-nats-streaming"
import { Order } from "../../models/order"
import { Show } from "../../models/show"
import { removeSeat } from "../../services/removeSeat"
import { OrderCancelledPublisher } from "../publisher/order-cancelled-publisher"

export class ExpirationCompleteListener extends Listener {
  subject = Subjects.ExpirationComplete
  queueGroupName = 'orders-service'

  async onMessage(data: any, msg: Message) {
    const order = await Order.findById(data.orderId)

    if(!order) throw new Error('Order not found')
    if(order.status === OrderStatus.Complete) return msg.ack()

    const show = await Show.findById(Buffer.from(order.show.id).toString('hex'))
    if(!show) throw new NotFoundError()

    removeSeat(order.seat, show.selectedSeat!)
    await show.save()

    order.set({
      status: OrderStatus.Cancelled
    })
    await order.save()

    await new OrderCancelledPublisher(this.client).publish({
      id: order.id,
      version: order.version,
      seat: order.seat,
      showId: order.show.id
    })

    msg.ack()
  }
}