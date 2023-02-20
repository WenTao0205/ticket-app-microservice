import { Publisher, Subjects } from "@zwt-tickets/common"

export class OrderCancelledPublisher extends Publisher {
  subject = Subjects.OrderCancelld
}