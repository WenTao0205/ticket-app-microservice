import { Listener, Subjects } from '@zwt-tickets/common';
import { Message } from 'node-nats-streaming';
import { expirationQueue } from '../../queues/expiration-queue';

export class OrderCreatedListener extends Listener {
  subject = Subjects.OrderCreated;
  queueGroupName = 'expiration-service';

  async onMessage(data: any, msg: Message) {
    const delay = new Date(data.expriesAt).getTime() - new Date().getTime()
    console.log(`订单将在 ${delay} 毫秒后取消`)
    await expirationQueue.add(
      {
        orderId: data.id
      },
      {
        delay
      }
    )
    msg.ack()
  }
}
