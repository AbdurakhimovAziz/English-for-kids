import React, { useEffect, useState } from 'react';
import useActions from '../../hooks/useActions';
import { ICard } from '../../models/ICard';
import { ICategory } from '../../models/ICategory';
import INewWord from '../../models/INewWord';
import uploadToCloudinary from '../../shared/uploadToCloudinary';

export interface WordFormProps {
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  category: ICategory;
  currentWord?: ICard;
}

const WordForm: React.FC<WordFormProps> = ({ setEditMode, category, currentWord }) => {
  const [newWord, setNewWord] = useState<INewWord>({ word: '', translation: '' });
  const [uploading, setUploading] = useState(false);
  const { createWord, updateWord } = useActions();

  const imagePreset = 'gjeytnyo';
  const audioPreset = 'jmckagk3';

  useEffect(() => {
    if (currentWord) setNewWord({ word: currentWord.word, translation: currentWord.translation });
  }, []);

  const clearForm = () => {
    setNewWord({ word: '', translation: '' });
    setUploading(false);
    setEditMode(false);
  };

  const createWordHandler = async () => {
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
    clearForm();
  };

  const updateWordHandler = async () => {
    const updatedWord: ICard = {
      word: newWord.word,
      translation: newWord.translation,
      image: currentWord?.image || '',
      audioSrc: currentWord?.audioSrc || ''
    };
    if (newWord.image) {
      const imageSrc = await uploadToCloudinary('image', newWord.image, imagePreset);
      updatedWord.image = imageSrc;
    }
    if (newWord.audio) {
      const audioSrc = await uploadToCloudinary('video', newWord.audio, audioPreset);
      updatedWord.audioSrc = audioSrc;
    }
    updateWord(category._id || '', currentWord?._id || '', updatedWord);
    clearForm();
  };

  const submitHandler: React.FormEventHandler = (e) => {
    e.preventDefault();
    setUploading(true);
    if (currentWord) updateWordHandler();
    else createWordHandler();
  };

  return (
    <form onSubmit={submitHandler} className="word__form form-word">
      <div className="form__inputs">
        <div className="form-word__input">
          <label htmlFor="word">Word</label>
          <input
            type="text"
            name="word"
            id="word"
            value={newWord.word}
            onChange={(e) => setNewWord({ ...newWord, word: e.target.value })}
            required
          />
        </div>
        <div className="form-word__input">
          <label htmlFor="translation">Translation</label>
          <input
            type="text"
            name="translation"
            id="translation"
            value={newWord.translation}
            onChange={(e) => setNewWord({ ...newWord, translation: e.target.value })}
            required
          />
        </div>
        <div className="form-word__input file-input">
          <p>
            <span>Image:</span>
            {newWord.image?.name}
          </p>
          <label htmlFor="image" className="admin__btn btn--green">
            Select file
          </label>
          <input
            type="file"
            name="image"
            id="image"
            accept="image/*"
            onChange={(e) => setNewWord({ ...newWord, image: e.target.files![0] })}
          />
        </div>
        <div className="form-word__input file-input">
          <p>
            <span>Sound:</span>
            {newWord.audio?.name}
          </p>
          <label htmlFor="audioSrc" className="admin__btn btn--green">
            Select file
          </label>
          <input
            type="file"
            name="audioSrc"
            id="audioSrc"
            accept="audio/*"
            onChange={(e) => setNewWord({ ...newWord, audio: e.target.files![0] })}
            required={!currentWord}
          />
        </div>
      </div>
      {uploading ? <p>Loading...</p> : ''}
      <div className="form-word__btns">
        <button className="admin__btn btn--blue" type="submit" disabled={uploading}>
          {currentWord ? 'update' : 'create'}
        </button>
        <button className="admin__btn btn--red" type="button" onClick={() => setEditMode(false)}>
          cancel
        </button>
      </div>
    </form>
  );
};

export default WordForm;
