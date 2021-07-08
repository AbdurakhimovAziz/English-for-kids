import ICardStats from '../models/ICardStats';
import { CardStatsProps } from './constants';

const changeCardStats = (key: string, property: CardStatsProps): void => {
  const cardStats: ICardStats = JSON.parse(localStorage.getItem(key) || '');
  if (cardStats) {
    switch (property) {
      case CardStatsProps.clicks:
        cardStats.clicks++;
        break;
      case CardStatsProps.correctClicks:
        cardStats.correctClicks++;
        break;
      case CardStatsProps.wrongClicks:
        cardStats.wrongClicks++;
        break;
      default:
        break;
    }
    const totalClicks = cardStats.wrongClicks + cardStats.correctClicks;
    cardStats.correctPersent = totalClicks > 0 ? Math.round((cardStats.correctClicks / totalClicks) * 100) : 0;

    localStorage.setItem(key, JSON.stringify(cardStats));
  }
};

export default changeCardStats;
