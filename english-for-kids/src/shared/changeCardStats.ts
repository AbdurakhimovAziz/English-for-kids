import ICardStats from '../models/ICardStats';
import { CardStatsProps } from './constants';

const changeCardStats = (key: string, property: CardStatsProps): void => {
  console.log(key);

  const cardStats: ICardStats = JSON.parse(localStorage.getItem(key) || '');
  if (cardStats) {
    switch (property) {
      case CardStatsProps.CLICKS:
        cardStats.clicks++;
        break;
      case CardStatsProps.CORRECT_CLICKS:
        cardStats.correctClicks++;
        break;
      case CardStatsProps.WRONG_CLICKS:
        cardStats.wrongClicks++;
        break;
      default:
        break;
    }
    localStorage.setItem(key, JSON.stringify(cardStats));
  }
};

export default changeCardStats;
