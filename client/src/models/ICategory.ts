import { ICard } from './ICard';

export interface ICategory {
  _id?: string;
  categoryName: string;
  cards: ICard[];
}
