import { Message } from "node-nats-streaming";
import { Subjects, Listener } from "@zwt-tickets/common";
import { Show } from "../../models/show";

export class ShowUpdatedListener extends Listener {
  subject = Subjects.ShowUpdated
  queueGroupName = 'orders-service'

  async onMessage(data: any, msg: Message) {
    const show = await Show.findOne({
      _id: data.id,
      version: data.version - 1
    })

    if(!show) throw new Error('Show not found')

    const { title, price, intro, cover, startTime, endTime, selectedSeat, hall } = data
    show.set({ title, price, intro, cover, startTime, endTime, selectedSeat, hall })
    await show.save()

    msg.ack()
  }
}