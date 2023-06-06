import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import AddElement from '../../../components/addElement/addElement';
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
        <h2 className="words__title">
          Category: <span>{category.categoryName}</span>
        </h2>
        <div className="words">
          {category.cards.map((card, index) => (
            <Word word={card} category={category} key={index} />
          ))}
          <div className="word admin__card">
            {editMode ? (
              <WordForm setEditMode={setEditMode} category={category} />
            ) : (
              <>
                <h2 className="admin__title">Add New Word</h2>
                <AddElement setEditMode={setEditMode} />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Words;
