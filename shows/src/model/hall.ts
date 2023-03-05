import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

interface HallAttrs {
  id: string
  name: string
  city: string
  address: string
  seatsNumber: Number
}

export interface HallDoc extends mongoose.Document {
  name: string
  city: string
  address: string
  seatsNumber: Number
  version: number
}

interface HallModel extends mongoose.Model<HallDoc> {
  build(attrs: HallAttrs): HallDoc
}

const hallSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    seatsNumber: {
      type: Number,
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

hallSchema.set('versionKey', 'version')
hallSchema.plugin(updateIfCurrentPlugin)

hallSchema.statics.build = (attrs: HallAttrs) => {
  return new Hall({
    _id: attrs.id,
    name: attrs.name,
    city: attrs.city,
    address: attrs.address,
    seatsNumber: attrs.seatsNumber
  })
}

const Hall = mongoose.model<HallDoc, HallModel>('Hall', hallSchema)

export { Hall }
