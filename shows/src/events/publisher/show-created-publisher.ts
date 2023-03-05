import { Publisher, Subjects } from "@zwt-tickets/common"

export class ShowCreatedPublisher extends Publisher {
  subject = Subjects.ShowCreated // 添加show-created subject
}