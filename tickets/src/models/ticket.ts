import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

interface TicketAttrs {
  title: string
  price: number
  userId: string
  type?: string
  site?: string
  seat?: string
  cover?: string
  intro?: string
}

interface TicketDoc extends mongoose.Document {
  title: string
  price: number
  userId: string
  version: number
  orderId?: string
  status?: string
  type?: string
  site?: string
  seat?: string
  cover?: string
  intro?: string
}

interface TicketModel extends mongoose.Model<TicketDoc> {
  build(attrs: TicketAttrs): TicketDoc
}

const ticketSchema = new mongoose.Schema(
{
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  orderId: {
    type: String
  },
  status: {
    type: String,
    default: '审核中'
  },
  type: {
    type: String
  },
  site: {
    type: String
  },
  seat: {
    type: String
  },
  cover: {
    type: String
  },
  intro: {
    type: String
  }
},
{
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id
      delete ret._id
    }
  }
}
)

ticketSchema.set('versionKey', 'version')
ticketSchema.plugin(updateIfCurrentPlugin)

ticketSchema.statics.build = (attrs: TicketAttrs) => new Ticket(attrs)

const Ticket = mongoose.model<TicketDoc, TicketModel>('Ticket', ticketSchema)

export { Ticket }