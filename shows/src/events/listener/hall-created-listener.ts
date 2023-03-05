import { Subjects, Listener } from "@zwt-tickets/common"
import { Message } from "node-nats-streaming"
import { Hall } from '../../model/hall'

export class HallCreatedListener extends Listener {
  subject = Subjects.HallCreated // HallCreated
  queueGroupName = 'shows-service'

  async onMessage(data: any, msg: Message) {
    const { id, name, city, address, seatsNumber } = data
    const hall = Hall.build({
      id, name, city, address, seatsNumber
    })
    await hall.save()
    msg.ack()
  }
}