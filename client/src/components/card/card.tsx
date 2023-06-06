import React, { useEffect, useRef, useState } from 'react';
import rotateImg from '../../assets/rotate.svg';
import useActions from '../../hooks/useActions';
import useTypeSelector from '../../hooks/useTypeSelector';
import { playCorrectSound, playWrongSound } from '../../shared/playAudio';
import changeCardStats from '../../shared/changeCardStats';
import { CardStatsProps } from '../../shared/constants';
import { ICard } from '../../models/ICard';

interface PropTypes {
  card: ICard;
  soundPlaying: boolean;
}

const ROTATE_CLASS = 'rotate';
const CORRECT_CLASS = 'correct';

const Card: React.FC<PropTypes> = ({ card, soundPlaying }) => {
  const { isPlayMode } = useTypeSelector((state) => state.global);
  const { currentCard, gameStarted } = useTypeSelector((state) => state.game);
  const { addCorrectMove, addWrongMove } = useActions();
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    setAudio(new Audio(card.audioSrc));
  }, []);

  const cardRef = useRef<HTMLDivElement>(null);
  const clickHandler = () => {
    if (gameStarted && !soundPlaying) {
      if (currentCard?._id === card._id) {
        changeCardStats(card._id || '', CardStatsProps.correctClicks);
        playCorrectSound();
        addCorrectMove();
        cardRef.current?.classList.add(CORRECT_CLASS);
      } else {
        changeCardStats(card._id || '', CardStatsProps.wrongClicks);
        playWrongSound();
        addWrongMove();
      }
    }
    if (isPlayMode) return;
    changeCardStats(card._id || '', CardStatsProps.clicks);
    if (audio) {
      audio.currentTime = 0;
      audio.play();
    }
  };

  useEffect(() => {
    if (!gameStarted) cardRef.current?.classList.remove(CORRECT_CLASS);
  }, [gameStarted]);

  return (
    <div className="cards__card" ref={cardRef} onMouseLeave={() => cardRef.current?.classList.remove(ROTATE_CLASS)}>
      <div className="card__front card" onClick={clickHandler}>
        <div className={`cards__card-img ${isPlayMode ? 'img--cover' : ''}`}>
          <img src={card.image} alt={card.word} />
        </div>
        {isPlayMode ? (
          ''
        ) : (
          <div className="card__title">
            {card.word}
            <div
              className="card__rotate"
              onClick={(e) => {
                e.stopPropagation();
                cardRef.current?.classList.add(ROTATE_CLASS);
              }}
            >
              <img src={rotateImg} alt="rotate icon" />
            </div>
          </div>
        )}
      </div>
      <div className="card__back card">
        <div className="cards__card-img">
          <img src={card.image} alt={card.translation} />
        </div>
        {isPlayMode ? '' : <div className="card__title">{card.translation}</div>}
      </div>
    </div>
  );
};

export default Card;
