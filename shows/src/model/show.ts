import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';
import { HallDoc } from './hall';

interface ShowAttrs {
  title: string
  price: string
  intro?: string
  cover?: string
  startTime: string
  endTime: string
  selectedSeat?: Array<number>
  hall: HallDoc
}

interface ShowDoc extends mongoose.Document {
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
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hall',
      required: true
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

showSchema.statics.build = (attrs: ShowAttrs) => new Show(attrs)

const Show = mongoose.model<ShowDoc, ShowModel>('Show', showSchema)

export { Show }
