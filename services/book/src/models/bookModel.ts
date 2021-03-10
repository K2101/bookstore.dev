import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

enum BookTypes {
  paperBack = 'paperback',
  kindle = 'kindle',
}

interface BookAttrs {
  title: string;
  price: number;
  description: string;
  quantity: number;
  author: string;
  publisher: string;
  type: BookTypes;
  pages: string;
  weight: number;
  language: string;
  isbnTenNumber?: string;
}

interface BookDoc extends mongoose.Document {
  title: string;
  price: number;
  description: string;
  quantity: number;
  author: string;
  publisher: string;
  type: BookTypes;
  pages: string;
  weight: number;
  language: string;
  isbnTenNumber?: string;
  version: number;
}

interface BookModel extends mongoose.Model<BookDoc> {
  build(attrs: BookAttrs): BookDoc;
}

// just use s3 for images source and need to migrate schema

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    description: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    publisher: {
      type: String,
      required: true,
    },
    type: {
      type: Object.values(BookTypes),
      lowercase: true,
      required: true,
    },
    pages: {
      type: String,
      required: true,
    },
    weight: {
      type: Number,
      min: 0,
    },
    language: {
      type: String,
      default: 'English',
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

bookSchema.statics.build = (attrs: BookAttrs) => {
  return new Book(attrs);
};

const Book = mongoose.model<BookDoc, BookModel>('Book', bookSchema);

export { Book };
