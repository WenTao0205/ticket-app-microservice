import { Message } from "node-nats-streaming";
import { Subjects, Listener } from "@zwt-tickets/common";
import { Ticket } from "../../models/ticket";

export class TicketCreatedListener extends Listener {
  subject = Subjects.TicketCreated
  queueGroupName = 'orders-service'

  async onMessage(data: any, msg: Message) {
    const { id, title, price } = data
    const ticket = Ticket.build({
      id, title, price
    })
    await ticket.save()
  }
}