import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

export enum BookTypes {
  paperBack = 'paperback',
  kindle = 'kindle',
}

interface BookAttrs {
  id: string;
  title: string;
  price: number;
  quantity: number;
  weight: number;
  author: string;
  type: BookTypes;
  isbnTenNumber?: string;
}

export interface BookDoc extends mongoose.Document {
  id: string;
  title: string;
  price: number;
  quantity: number;
  weight: number;
  author: string;
  type: BookTypes;
  isbnTenNumber?: string;
  version: number;
}

interface BookModel extends mongoose.Model<BookDoc> {
  build(attrs: BookAttrs): BookDoc;

  findByEvent(event: { id: string; version: number }): Promise<BookDoc | null>;
}

const bookSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    quantity: {
      type: Number,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    type: {
      type: Object.values(BookTypes),
      lowercase: true,
      required: true,
    },
    weight: {
      type: Number,
      min: 0,
    },
    isbnTenNumber: {
      type: String,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        (ret.id = ret._id), delete ret._id;
      },
    },
  }
);

bookSchema.set('versionKey', 'version');
bookSchema.plugin(updateIfCurrentPlugin);

bookSchema.statics.findByEvent = (event: { id: string; version: number }) => {
  return Book.findOne({
    _id: event.id,
    version: event.version - 1,
  });
};

bookSchema.statics.build = (attrs: BookAttrs) => {
  return new Book({
    _id: attrs.id,
    title: attrs.title,
    price: attrs.price,
    quantity: attrs.quantity,
    weight: attrs.weight,
    author: attrs.author,
    type: attrs.type,
    isbnTenNumber: attrs.isbnTenNumber,
  });
};

const Book = mongoose.model<BookDoc, BookModel>('Book', bookSchema);

export { Book };
