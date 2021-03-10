import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';
import { BookDoc } from './bookModel';

interface OrderAttrs {
  userId: string;
  books: BookDoc[];
  status: string;
  totalPrice: number;
  amount: number;
  weight: number;
}

export interface OrderDoc extends mongoose.Document {
  userId: string;
  books: BookDoc[];
  status: string;
  totalPrice: number;
  amount: number;
  weight: number;
  version: number;
}

interface OrderModel extends mongoose.Model<OrderDoc> {
  build(attrs: OrderAttrs): OrderDoc;
}

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    books: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Book',
        },
        title: { type: String },
        price: { type: Number },
        amountOfBuyingBook: { type: Number },
        weigth: { type: Number },
      },
    ],
    status: {
      type: String,
      required: true,
    },
    totalPrice: { type: Number },
    amount: { type: Number },
    weight: { type: Number },
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

orderSchema.set('versionKey', 'version');
orderSchema.plugin(updateIfCurrentPlugin);

orderSchema.statics.build = (attrs: OrderAttrs) => {
  return new Order(attrs);
};

const Order = mongoose.model<OrderDoc, OrderModel>('Order', orderSchema);

export { Order };
