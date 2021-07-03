import * as React from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Card from '../../components/card/card';
import useActions from '../../hooks/useActions';
import useTypeSelector from '../../hooks/useTypeSelector';
import playAudio from '../../shared/playAudio';
import './cards.scss';
import correctImg from '../../assets/correct.png';
import wrongImg from '../../assets/wrong.png';
import happy from '../../assets/happy.svg';
import sad from '../../assets/sad.svg';

const Cards: React.FC = () => {
  const { cardCategories } = useTypeSelector((state) => state.categories);
  const { isPlayMode } = useTypeSelector((state) => state.global);
  const location = useLocation();

  const currentCategory = cardCategories.find((category) => category.categoryName === location.state);

  const { currentCard, correct, gameStarted, gameCards } = useTypeSelector((state) => state.game);
  const { setCurrentCard, startGame, setGameCards } = useActions();

  const gameHandler: React.MouseEventHandler = async (e) => {
    if (gameStarted) {
      playAudio(`./public/${currentCard?.audioSrc}`);
    } else {
      const cards = currentCategory?.cards.slice().sort(() => Math.random() - 0.5);
      if (cards) {
        setGameCards(cards);
        startGame();
      }
    }
  };

  useEffect(() => {
    if (gameStarted) {
      if (gameCards.length === correct) console.log('won');

      setCurrentCard(gameCards[correct]);
    }
  }, [gameStarted, correct]);

  useEffect(() => {
    if (gameStarted) {
      playAudio(`./public/${currentCard?.audioSrc}`);
      console.log(currentCard);
    }
  }, [currentCard]);

  return (
    <div className="cards">
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
      {isPlayMode ? (
        <div className="btn__container">
          <button className={`btn ${gameStarted ? 'repeat' : ''}`} onClick={gameHandler}>
            start game
          </button>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default Cards;
