import React from 'react';
import { ICard } from '../../models/ICard';
import './word.scss';

export interface WordProps {
  word: ICard;
}

const Word: React.FC<WordProps> = ({ word }) => {
  return (
    <div className="word">
      <div>{word.word}</div>
      <div>{word.translation}</div>
      <div>{word.image}</div>
      <div>{word.audioSrc}</div>
    </div>
  );
};

export default Word;
