import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Word from '../../../components/word/word';
import WordForm from '../../../components/word/wordForm';
import useTypeSelector from '../../../hooks/useTypeSelector';
import { ICategory } from '../../../models/ICategory';
import './words.scss';

const Words: React.FC = () => {
  const [editMode, setEditMode] = useState(false);
  const { cardCategories } = useTypeSelector((state) => state.categories);
  const location = useLocation();
  const [category, setCategory] = useState<ICategory>(location.state as ICategory);

  useEffect(() => {
    setCategory(cardCategories.find((cat) => cat._id === category._id) || category);
  }, [cardCategories]);

  return (
    <>
      <div className="words__wrapper">
        <h2>{category.categoryName}</h2>
        <div className="words">
          {category.cards.map((card, index) => (
            <Word word={card} category={category} key={index} />
          ))}
          <div className="word word__card">
            {editMode ? (
              <WordForm setEditMode={setEditMode} category={category} />
            ) : (
              <button className="word__btn" onClick={() => setEditMode(true)}>
                +
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Words;
