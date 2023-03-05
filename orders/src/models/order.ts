import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';
import { ShowDoc } from './show';

interface OrderAttrs {
  userId: string;
  price: number;
  seat: Array<number>;
  status: string;
  expiresAt: Date;
  show: ShowDoc;
}

interface OrderDoc extends mongoose.Document {
  userId: string;
  price: number;
  seat: Array<number>;
  status: string;
  expiresAt: Date;
  show: ShowDoc;
  version: number;
}

interface OrderModel extends mongoose.Model<OrderDoc> {
  build(attrs: OrderAttrs): OrderDoc;
}

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    seat: {
      type: Array,
      required: true
    },
    status: {
      type: String,
      required: true
    },
    expiresAt: {
      type: mongoose.Schema.Types.Date
    },
    show: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Show',
      required: true
    },
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

orderSchema.set('versionKey', 'version')
orderSchema.plugin(updateIfCurrentPlugin)

orderSchema.statics.build = (attrs: OrderAttrs) => {
  return new Order(attrs);
};

const Order = mongoose.model<OrderDoc, OrderModel>('Order', orderSchema);

export { Order };
