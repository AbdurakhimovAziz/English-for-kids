import mongoose, { Schema } from 'mongoose';
import { ICategory, ICategoryDocument } from './ICategory';

const Category = new Schema<ICategory>({
  categoryName: { type: String, require: true, unique: true },
  cards: {
    type: [
      {
        word: { type: String },
        translation: { type: String },
        image: { type: String },
        audioSrc: { type: String },
      },
    ],
    default: [],
  },
});

export default mongoose.model<ICategoryDocument>('category', Category);
