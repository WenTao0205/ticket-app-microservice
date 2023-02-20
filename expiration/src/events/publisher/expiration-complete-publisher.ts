import { Subjects, Publisher } from "@zwt-tickets/common"

export class ExpirationCompletePublisher extends Publisher {
  subject = Subjects.ExpirationComplete
}