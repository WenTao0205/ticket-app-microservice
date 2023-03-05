import { Publisher, Subjects } from "@zwt-tickets/common"

export class HallUpdatedPublisher extends Publisher {
  subject = Subjects.HallUpdated // 添加hall-updated subject
}