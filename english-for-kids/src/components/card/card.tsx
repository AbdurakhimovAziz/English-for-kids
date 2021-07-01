import React, { useRef } from 'react';
import rotateImg from '../../assets/rotate.svg';

interface PropTypes {
  imgSrc: string;
  word: string;
  translation: string;
  audioSrc: string;
}

const ROTATE_CLASS = 'rotate';

const Card: React.FC<PropTypes> = ({ imgSrc, word, translation }) => {
  const card = useRef<HTMLDivElement>(null);
  return (
    <div className="cards__card" ref={card} onMouseLeave={() => card.current?.classList.remove(ROTATE_CLASS)}>
      <div className="card__front card">
        <div className="cards__card-img">
          <img src={`./public/${imgSrc}`} alt={word} />
        </div>
        <div className="card__title">
          {word}
          <div className="card__rotate" onClick={() => card.current?.classList.add(ROTATE_CLASS)}>
            <img src={rotateImg} alt="rotate icon" />
          </div>
        </div>
      </div>
      <div className="card__back card">
        <div className="cards__card-img">
          <img src={`./public/${imgSrc}`} alt={translation} />
        </div>
        <div className="card__title">{translation}</div>
      </div>
    </div>
  );
};

export default Card;