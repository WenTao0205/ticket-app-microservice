import { Publisher, Subjects } from "@zwt-tickets/common"

export class ShowUpdatedPublisher extends Publisher {
  subject = Subjects.ShowUpdated // 添加show-updated subject
}