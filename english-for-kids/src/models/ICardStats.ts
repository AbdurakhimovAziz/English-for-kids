import { CardStatsProps } from '../shared/constants';

interface ICardStats {
  word: string;
  translation: string;
  category: string;
  [CardStatsProps.CLICKS]: number;
  [CardStatsProps.CORRECT_CLICKS]: number;
  [CardStatsProps.WRONG_CLICKS]: number;
}

export default ICardStats;
