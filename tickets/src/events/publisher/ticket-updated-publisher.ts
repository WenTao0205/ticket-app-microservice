import { Publisher, Subjects } from "@zwt-tickets/common"

export class TicketUpdatedPublisher extends Publisher {
  subject = Subjects.TicketUpdated
}