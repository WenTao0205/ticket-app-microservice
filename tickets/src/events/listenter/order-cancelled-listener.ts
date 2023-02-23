import { Listener, Subjects } from "@zwt-tickets/common"
import mongoose from "mongoose"
import { Message } from "node-nats-streaming"
import { Ticket } from "../../models/ticket"
import { TicketUpdatedPublisher } from "../publisher/ticket-updated-publisher"

export class OrderCancelledListener extends Listener {
  subject = Subjects.OrderCancelld
  queueGroupName = 'tickets-service'

  async onMessage(data: any, msg: Message) {
    const ticket = await Ticket.findById(data.ticket.id)

    if(!ticket) throw new Error('Ticket not found')

    ticket.set({ orderId: undefined })
    await ticket.save()
    await new TicketUpdatedPublisher(this.client).publish({
      id: ticket.id,
      price: ticket.price,
      title: ticket.title,
      userId: ticket.userId,
      orderId: ticket.orderId,
      version: ticket.version
    })

    msg.ack()
  }
}