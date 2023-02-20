import { Publisher, Subjects } from "@zwt-tickets/common"

export class TicketCreatedPublisher extends Publisher {
  subject = Subjects.TicketCreated
}