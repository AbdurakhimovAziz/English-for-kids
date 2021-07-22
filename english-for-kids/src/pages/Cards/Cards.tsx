import * as React from 'react';
import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import useActions from '../../hooks/useActions';
import useTypeSelector from '../../hooks/useTypeSelector';
import playAudio from '../../shared/playAudio';
import './cards.scss';
import delay from '../../shared/delay';
import gameWinSound from '../../assets/game-win.mp3';
import gameLooseSound from '../../assets/game-over.mp3';
import { ICard } from '../../models/ICard';
import Card from '../../components/card/card';

const Cards: React.FC = () => {
  const { isPlayMode } = useTypeSelector((state) => state.global);
  const { currentCard, correct, wrong, gameStarted, gameCards } = useTypeSelector((state) => state.game);
  const { setCurrentCard, startGame, setGameCards } = useActions();

  const location = useLocation();
  const history = useHistory();

  const [answers, setAnswers] = useState<string[]>([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [soundPlaying, setSoundPlaying] = useState(false);

  const currentCards = location.state as ICard[];

  const gameHandler: React.MouseEventHandler = async () => {
    if (gameStarted) {
      playAudio(currentCard?.audioSrc);
    } else {
      const cards = currentCards?.slice().sort(() => Math.random() - 0.5);
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
        delay(1000).then(() => {
          setIsGameOver(true);
          if (wrong > 0) playAudio(gameLooseSound);
          else playAudio(gameWinSound);
          delay(4000).then(() => history.push('/'));
        });
      }

      setCurrentCard(gameCards[correct]);
    } else {
      setAnswers([]);
    }
  }, [gameStarted, correct]);

  useEffect(() => {
    if (gameStarted && wrong > 0) setAnswers((prev) => [...prev, 'wrong']);
  }, [wrong]);

  useEffect(() => {
    if (gameStarted) {
      setSoundPlaying(true);
      delay(2000).then(() => {
        const audio = playAudio(currentCard?.audioSrc);
        if (audio)
          audio.onended = () => {
            setSoundPlaying(false);
          };
      });
    }
  }, [currentCard]);

  if (!currentCards || currentCards.length === 0) return <div className="empty">No cards to display</div>;

  return isGameOver ? (
    <div className={`${wrong > 0 ? 'failure' : 'success'}`}>
      <h2 className="game-over__text">{wrong > 0 ? `${wrong} error(s)` : 'Congratulations! You won'}</h2>
    </div>
  ) : (
    <div className="cards">
      <div className="rating">
        {answers.map((answer, index) => (
          <div className={answer} key={index}></div>
        ))}
      </div>
      <div className="cards__row">
        {currentCards?.map((card, index) => (
          <Card card={card} key={index} soundPlaying={soundPlaying} />
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
