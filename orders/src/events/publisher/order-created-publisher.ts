import { Publisher, Subjects } from "@zwt-tickets/common"

export class OrderCreatedPublisher extends Publisher {
  subject = Subjects.OrderCreated
}