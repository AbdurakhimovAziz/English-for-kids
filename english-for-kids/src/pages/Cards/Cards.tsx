import * as React from 'react';
import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Card from '../../components/card/card';
import useActions from '../../hooks/useActions';
import useTypeSelector from '../../hooks/useTypeSelector';
import playAudio from '../../shared/playAudio';
import './cards.scss';
import happy from '../../assets/happy.svg';
import sad from '../../assets/sad.svg';
import delay from '../../shared/delay';

const Cards: React.FC = () => {
  const { cardCategories } = useTypeSelector((state) => state.categories);
  const { isPlayMode } = useTypeSelector((state) => state.global);
  const location = useLocation();
  const history = useHistory();

  const [answers, setAnswers] = useState<string[]>([]);
  const [isGameOver, setIsGameOver] = useState(false);

  const currentCategory = cardCategories.find((category) => category.categoryName === location.state);

  const { currentCard, correct, wrong, gameStarted, gameCards } = useTypeSelector((state) => state.game);
  const { setCurrentCard, startGame, setGameCards } = useActions();

  const gameHandler: React.MouseEventHandler = async () => {
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
      if (correct > 0 && correct < gameCards.length) setAnswers((prev) => [...prev, 'correct']);
      if (gameCards.length === correct) {
        setIsGameOver(true);
        delay(3000).then(() => history.push('/'));
      }

      setCurrentCard(gameCards[correct]);
    }
  }, [gameStarted, correct]);

  useEffect(() => {
    if (gameStarted && wrong > 0) setAnswers((prev) => [...prev, 'wrong']);
  }, [wrong]);

  useEffect(() => {
    if (gameStarted) {
      playAudio(`./public/${currentCard?.audioSrc}`);
      console.log(currentCard);
    }
  }, [currentCard]);

  return isGameOver ? (
    <div className={`${wrong > 0 ? 'success' : 'failure'}`}></div>
  ) : (
    <div className="cards">
      <p>{currentCategory?.categoryName}</p>
      <div className="rating">
        {answers.map((answer, index) => (
          <div className={answer} key={index}></div>
        ))}
      </div>
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
