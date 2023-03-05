import { Subjects, Listener } from "@zwt-tickets/common"
import { Message } from "node-nats-streaming"
import { Hall } from '../../model/hall'

export class HallUpdatedListener extends Listener {
  subject = Subjects.HallUpdated // HallUpdated
  queueGroupName = 'shows-service'

  async onMessage(data: any, msg: Message) {
    const hall = await Hall.findOne({
      _id: data.id,
      version: data.version - 1
    })
    if(!hall) throw new Error('Ticket not found')

    const { name, city, address, seatsNumber } = data
    hall.set({ name, city, address, seatsNumber })
    await hall.save()
    
    msg.ack()
  }
}