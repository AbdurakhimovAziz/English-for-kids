import React, { useState } from 'react';
import useActions from '../../hooks/useActions';
import { ICard } from '../../models/ICard';
import { ICategory } from '../../models/ICategory';
import './word.scss';
import WordForm from './wordForm';

export interface WordProps {
  word: ICard;
  category: ICategory;
}

const Word: React.FC<WordProps> = ({ word, category }) => {
  const [editMode, setEditMode] = useState(false);
  const { deleteWord } = useActions();

  return (
    <div className="word">
      {editMode ? (
        <WordForm category={category} currentWord={word} setEditMode={setEditMode} />
      ) : (
        <>
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
          <button className="btn--green" onClick={() => setEditMode(true)}>
            Change
          </button>
        </>
      )}
    </div>
  );
};

export default Word;
