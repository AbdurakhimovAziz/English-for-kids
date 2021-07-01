import * as React from 'react';
import { useLocation } from 'react-router-dom';
import Card from '../../components/card/card';
import useTypeSelector from '../../hooks/useTypeSelector';
import './cards.scss';

const Cards: React.FC = () => {
  const { cardCategories } = useTypeSelector((state) => state.categories);
  const params = useLocation();
  const currentCategory = cardCategories.find((category) => category.categoryName === params.state);

  return (
    <div className="cards">
      <h1>Cards</h1>
      <p>{currentCategory?.categoryName}</p>
      <div className="cards__row">
        {currentCategory?.cards.map((card, index) => (
          <Card
            imgSrc={card.image}
            word={card.word}
            translation={card.translation}
            audioSrc={card.audioSrc}
            key={index}
          />
        ))}
      </div>
    </div>
  );
};

export default Cards;
