import React, { useState } from 'react';
import useActions from '../../hooks/useActions';
import { ICard } from '../../models/ICard';
import { ICategory } from '../../models/ICategory';
import './word.scss';

export interface WordProps {
  word: ICard;
  category: ICategory;
}

const Word: React.FC<WordProps> = ({ word, category }) => {
  const [editMode, setEditMode] = useState(false);
  const { deleteWord } = useActions();

  return (
    <div className="word">
      <h3>Word: {word.word}</h3>
      <p>Translation {word.translation}</p>
      <div className="word__img">
        Image:
        <img src={word.image} alt={word.word} />
      </div>
      <div className="word__audio">
        Sound:
        <audio src={word.audioSrc} controls></audio>
      </div>
      <button onClick={() => deleteWord(word._id || '', category._id || '')}>X</button>
    </div>
  );
};

export default Word;
