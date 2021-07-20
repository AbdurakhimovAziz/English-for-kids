import React, { useState } from 'react';
import AddElement from '../../../components/addElement/addElement';
import AdminCategory from '../../../components/adminCategoryCard/adminCategory';
import useActions from '../../../hooks/useActions';
import useTypeSelector from '../../../hooks/useTypeSelector';
import './admin-categories.scss';

const AdminCategories: React.FC = () => {
  const { createCategory } = useActions();
  const { cardCategories } = useTypeSelector((state) => state.categories);
  const [categoryName, setCategoryName] = useState('');
  const [editmode, setEditMode] = useState(false);

  return (
    <div className="admin-categories">
      {cardCategories && cardCategories.map((category, index) => <AdminCategory category={category} key={index} />)}
      <div className="admin-category admin__card">
        {editmode ? (
          <form
            className="categories__form form-categories"
            onSubmit={(e) => {
              e.preventDefault();
              createCategory({ categoryName, cards: [] });
              setCategoryName('');
            }}
          >
            <div className="form-categories__input">
              <label className="form-categories__label" htmlFor="category-name">
                Category name
              </label>
              <input
                type="text"
                value={categoryName}
                name="category-name"
                id="category-name"
                placeholder="Enter category name"
                onChange={(e) => setCategoryName(e.target.value)}
                required
              />
            </div>
            <div className="form-categories__btns">
              <button className="admin__btn btn--green" type="submit">
                create
              </button>
              <button
                className="admin__btn btn--red"
                type="button"
                onClick={() => {
                  setEditMode(false);
                  setCategoryName('');
                }}
              >
                cancel
              </button>
            </div>
          </form>
        ) : (
          <>
            <h2 className="admin__title">Create new Category</h2>
            <AddElement setEditMode={setEditMode} />
          </>
        )}
      </div>
    </div>
  );
};

export default AdminCategories;
