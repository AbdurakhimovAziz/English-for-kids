import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Word from '../../../components/word/word';
import useActions from '../../../hooks/useActions';
import useTypeSelector from '../../../hooks/useTypeSelector';
import { ICard } from '../../../models/ICard';
import { ICategory } from '../../../models/ICategory';
import uploadToCloudinary from '../../../shared/uploadToCloudinary';
import './words.scss';

interface newWord {
  word: string;
  translation: string;
  image?: File;
  audio?: File;
}

const imagePreset = 'gjeytnyo';
const audioPreset = 'jmckagk3';

const Words: React.FC = () => {
  const [addMode, setAddmode] = useState(false);
  const [newWord, setNewWord] = useState<newWord>({ word: '', translation: '' });
  const { cardCategories } = useTypeSelector((state) => state.categories);
  const { createWord } = useActions();
  const location = useLocation();
  const [category, setCategory] = useState<ICategory>(location.state as ICategory);

  useEffect(() => {
    setCategory(cardCategories.find((cat) => cat._id === category._id) || category);
  }, [cardCategories]);

  const submitHandler: React.FormEventHandler = async (e) => {
    e.preventDefault();
    const urls = await Promise.all([
      uploadToCloudinary('image', newWord.image, imagePreset),
      uploadToCloudinary('video', newWord.audio, audioPreset)
    ]);
    const newCard: ICard = {
      word: newWord.word,
      translation: newWord.translation,
      image: urls[0],
      audioSrc: urls[1]
    };

    createWord(category._id || '', newCard);
    setNewWord({ word: '', translation: '' });
    setAddmode(false);
  };

  return (
    <>
      <div className="words__wrapper">
        <h2>{category.categoryName}</h2>
        <div className="words">
          {category.cards.map((card, index) => (
            <Word word={card} category={category} key={index} />
          ))}
          <div className="word word__card">
            {addMode ? (
              <form onSubmit={submitHandler}>
                <label htmlFor="word">
                  <input
                    type="text"
                    name="word"
                    id="word"
                    onChange={(e) => setNewWord({ ...newWord, word: e.target.value })}
                    required
                  />
                </label>
                <label htmlFor="word">
                  <input
                    type="text"
                    name="translation"
                    id="translation"
                    onChange={(e) => setNewWord({ ...newWord, translation: e.target.value })}
                    required
                  />
                </label>
                <label htmlFor="word">
                  <input
                    type="file"
                    name="image"
                    id="image"
                    accept="image/*"
                    onChange={(e) => setNewWord({ ...newWord, image: e.target.files![0] })}
                  />
                </label>
                <label htmlFor="word">
                  <input
                    type="file"
                    name="audioSrc"
                    id="audioSrc"
                    accept="audio/*"
                    onChange={(e) => setNewWord({ ...newWord, audio: e.target.files![0] })}
                    required
                  />
                </label>
                <div>
                  <button className="admin-category__btn btn--green" type="submit">
                    create
                  </button>
                  <button className="admin-category__btn btn--green" type="button" onClick={() => setAddmode(false)}>
                    cancel
                  </button>
                </div>
              </form>
            ) : (
              <button className="word__btn" onClick={() => setAddmode(true)}>
                +
              </button>
            )}{' '}
          </div>
        </div>
      </div>
    </>
  );
};

export default Words;
