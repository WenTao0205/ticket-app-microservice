import { Message } from "node-nats-streaming";
import { Subjects, Listener } from "@zwt-tickets/common";
import { Show } from "../../models/show";

export class ShowCreatedListener extends Listener {
  subject = Subjects.ShowCreated
  queueGroupName = 'orders-service'

  async onMessage(data: any, msg: Message) {
    const { id, title, price, intro, cover, startTime, endTime, hall } = data
    const ticket = Show.build({
      id, title, price, intro, cover, startTime, endTime, hall
    })
    await ticket.save()

    msg.ack()
  }
}