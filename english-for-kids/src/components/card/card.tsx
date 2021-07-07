import React, { useEffect, useRef } from 'react';
import rotateImg from '../../assets/rotate.svg';
import useActions from '../../hooks/useActions';
import useTypeSelector from '../../hooks/useTypeSelector';
import playAudio from '../../shared/playAudio';
import correctSound from '../../assets/correct.mp3';
import wrongSound from '../../assets/error.mp3';
import changeCardStats from '../../shared/changeCardStats';
import { CardStatsProps } from '../../shared/constants';

interface PropTypes {
  imgSrc: string;
  word: string;
  translation: string;
  audioSrc: string;
  soundPlaying: boolean;
}

const ROTATE_CLASS = 'rotate';
const CORRECT_CLASS = 'correct';

const Card: React.FC<PropTypes> = ({ imgSrc, word, translation, audioSrc, soundPlaying }) => {
  const { isPlayMode } = useTypeSelector((state) => state.global);
  const { currentCard, gameStarted } = useTypeSelector((state) => state.game);
  const { addCorrectMove, addWrongMove } = useActions();
  const audio = new Audio(`./public/${audioSrc}`);

  const card = useRef<HTMLDivElement>(null);
  const clickHandler = () => {
    if (gameStarted && !soundPlaying) {
      if (currentCard?.word === word) {
        changeCardStats(`${currentCard?.word}-${currentCard?.translation}`, CardStatsProps.CORRECT_CLICKS);
        playAudio(correctSound);
        addCorrectMove();
        card.current?.classList.add(CORRECT_CLASS);
      } else {
        changeCardStats(`${currentCard?.word}-${currentCard?.translation}`, CardStatsProps.WRONG_CLICKS);
        playAudio(wrongSound);
        addWrongMove();
      }
    }
    if (isPlayMode) return;
    changeCardStats(`${word}-${translation}`, CardStatsProps.CLICKS);
    audio.play();
  };

  useEffect(() => {
    if (!gameStarted) card.current?.classList.remove(CORRECT_CLASS);
  }, [gameStarted]);

  return (
    <div
      className="cards__card"
      ref={card}
      onMouseLeave={(e) => {
        e.stopPropagation();
        card.current?.classList.remove(ROTATE_CLASS);
      }}
    >
      <div className="card__front card" onClick={clickHandler}>
        <div className={`cards__card-img ${isPlayMode ? 'img--cover' : ''}`}>
          <img src={`./public/${imgSrc}`} alt={word} />
        </div>
        {isPlayMode ? (
          ''
        ) : (
          <div className="card__title">
            {word}
            <div
              className="card__rotate"
              onClick={(e) => {
                e.stopPropagation();
                card.current?.classList.add(ROTATE_CLASS);
              }}
            >
              <img src={rotateImg} alt="rotate icon" />
            </div>
          </div>
        )}
      </div>
      <div className="card__back card">
        <div className="cards__card-img">
          <img src={`./public/${imgSrc}`} alt={translation} />
        </div>
        {isPlayMode ? '' : <div className="card__title">{translation}</div>}
      </div>
    </div>
  );
};

export default Card;
