import React, { useRef } from 'react';
import rotateImg from '../../assets/rotate.svg';
import useActions from '../../hooks/useActions';
import useTypeSelector from '../../hooks/useTypeSelector';
import playAudio from '../../shared/playAudio';

interface PropTypes {
  imgSrc: string;
  word: string;
  translation: string;
  audioSrc: string;
}

const ROTATE_CLASS = 'rotate';

const Card: React.FC<PropTypes> = ({ imgSrc, word, translation, audioSrc }) => {
  const { isPlayMode } = useTypeSelector((state) => state.global);
  const { currentCard, gameStarted } = useTypeSelector((state) => state.game);
  const { addCorrectMove } = useActions();

  const card = useRef<HTMLDivElement>(null);
  const clickHandler = () => {
    if (gameStarted) {
      if (currentCard?.word === word) {
        console.log('correct');
        addCorrectMove();
      }
    }
    if (isPlayMode) return;
    playAudio(audioSrc);
  };
  return (
    <div className="cards__card" ref={card} onMouseLeave={() => card.current?.classList.remove(ROTATE_CLASS)}>
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
