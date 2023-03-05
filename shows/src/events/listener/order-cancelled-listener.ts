import { Subjects, Listener, NotFoundError } from "@zwt-tickets/common"
import { Message } from "node-nats-streaming"
import { Show } from "../../model/show"
import { removeSeat } from "../../services/removeSeat"

export class OrderCancelledListener extends Listener {
  subject = Subjects.OrderCancelld
  queueGroupName = 'shows-service'

  async onMessage(data: any, msg: Message) {
    let { showId, seat } = data
    if(showId.type === 'Buffer') showId = Buffer.from(showId.data).toString('hex')

    const show = await Show.findById(showId)
    if(!show) throw new NotFoundError()

    removeSeat(seat, show.selectedSeat!)
    await show.save()

    msg.ack()
  }
}