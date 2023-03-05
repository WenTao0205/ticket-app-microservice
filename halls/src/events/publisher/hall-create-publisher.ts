import { Publisher, Subjects } from "@zwt-tickets/common"

export class HallCreatedPublisher extends Publisher {
  subject = Subjects.HallCreated // 添加hall-created subject
}