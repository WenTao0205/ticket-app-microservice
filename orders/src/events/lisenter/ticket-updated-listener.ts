import { Message } from "node-nats-streaming";
import { Subjects, Listener } from "@zwt-tickets/common";
import { Ticket } from "../../models/ticket";

export class TicketUpdatedListener extends Listener {
  subject = Subjects.TicketUpdated
  queueGroupName = 'orders-service'

  async onMessage(data: any, msg: Message) {
    const ticket = await Ticket.findOne({
      _id: data.id,
      version: data.version - 1
    })

    if(!ticket) throw new Error('Ticket not found')

    const { title, price } = data
    ticket.set({ title, price })
    await ticket.save()

    msg.ack()
  }
}