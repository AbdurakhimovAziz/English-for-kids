import React, { useState } from 'react';
import useActions from '../../hooks/useActions';
import { ICard } from '../../models/ICard';
import { ICategory } from '../../models/ICategory';
import DeleteElement from '../deleteElement/deleteElement';
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
    <div className="word admin__card">
      {editMode ? (
        <WordForm category={category} currentWord={word} setEditMode={setEditMode} />
      ) : (
        <>
          <h3 className="word__title">
            Word:<span>{word.word}</span>
          </h3>
          <p className="word__text">
            Translation:<span>{word.translation}</span>
          </p>
          <div className="word__audio">
            <p className="word__audio-title">Sound:</p>
            <audio className="word__audio-player" src={word.audioSrc} controls></audio>
          </div>
          <div className="word__img-container">
            <p className="word__img-title">Image:</p>
            <img className="word__img" src={word.image} alt={word.word} />
          </div>
          <button className="admin__btn btn--blue" onClick={() => setEditMode(true)}>
            Change
          </button>
          <DeleteElement clickHandler={() => deleteWord(word._id || '', category._id || '')} />
        </>
      )}
    </div>
  );
};

export default Word;
