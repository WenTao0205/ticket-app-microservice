import { Subjects, Listener, NotFoundError } from "@zwt-tickets/common"
import { Message } from "node-nats-streaming"
import { Show } from "../../model/show"

export class OrderCreatedListener extends Listener {
  subject = Subjects.OrderCreated
  queueGroupName = 'shows-service'

  async onMessage(data: any, msg: Message) {
    const { showId, seat } = data
    const show = await Show.findById(showId)
    if(!show) throw new NotFoundError()

    for(let i of seat) show.selectedSeat!.push(i)
    await show.save()

    msg.ack()
  }
}