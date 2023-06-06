import { Document } from 'mongoose';
import { ICard } from './ICard';

export interface ICategory {
  categoryName: string;
  cards: ICard[];
}

export interface ICategoryDocument extends ICategory, Document {}
