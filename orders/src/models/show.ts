import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';
import { HallDoc } from './halldoc';

interface ShowAttrs {
  id: string
  title: string
  price: string
  intro?: string
  cover?: string
  startTime: string
  endTime: string
  selectedSeat?: Array<number>
  hall?: HallDoc
}

export interface ShowDoc extends mongoose.Document {
  id: string
  title: string
  price: string
  intro?: string
  cover?: string
  startTime: string
  endTime: string
  selectedSeat?: Array<number>
  hall?: HallDoc
  version: number
}

interface ShowModel extends mongoose.Model<ShowDoc> {
  build(attrs: ShowAttrs): ShowDoc
}

const showSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true
    },
    price: {
      type: String,
      required: true,
    },
    intro: {
      type: String,
      default: ''
    },
    cover: {
      type: String,
      default: ''
    },
    startTime: {
      type: String,
      required: true
    },
    endTime: {
      type: String,
      required: true
    },
    selectedSeat: {
      type: Array,
      default: []
    },
    hall: {
      type: Object
    }
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

showSchema.set('versionKey', 'version')
showSchema.plugin(updateIfCurrentPlugin)

showSchema.statics.build = (attrs: ShowAttrs) => {
  return new Show({
    _id: attrs.id,
    title: attrs.title,
    price: attrs.price,
    intro: attrs.intro,
    cover: attrs.cover,
    startTime: attrs.startTime,
    endTime: attrs.endTime,
    selectedSeat: attrs.selectedSeat,
    hall: attrs.hall
  })
}

const Show = mongoose.model<ShowDoc, ShowModel>('Show', showSchema)

export { Show }
