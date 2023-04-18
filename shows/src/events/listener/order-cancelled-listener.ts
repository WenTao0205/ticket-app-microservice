import { Subjects, Listener, NotFoundError } from "@zwt-tickets/common"
import { ShowUpdatedPublisher } from '../publisher/show-updated-publisher'
import { natsWrapper } from '../../nats-wrapper'
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

    await new ShowUpdatedPublisher(natsWrapper.client).publish({
      id: show._id,
      title: show.title,
      type: show.type,
      rank: show.rank,
      intro: show.intro,
      price: show.price,
      cover: show.cover,
      startTime: show.startTime,
      endTime: show.endTime,
      selectedSeat: show.selectedSeat,
      hall: show.hall,
      version: show.version
    })

    msg.ack()
  }
}