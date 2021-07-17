import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import useActions from '../../hooks/useActions';
import { ICategory } from '../../models/ICategory';
import './adminCategory.scss';

export interface Props {
  category: ICategory;
}

const AdminCategory: React.FC<Props> = ({ category }) => {
  const { updateCategory, deleteCategory } = useActions();
  const [editMode, setEditMode] = useState(false);
  const [categoryName, setCategoryName] = useState('');

  return (
    <div className="admin-category">
      {editMode ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            category.categoryName = categoryName;
            updateCategory(category._id || '', category);
            setEditMode(false);
          }}
        >
          <div>
            <input type="text" defaultValue={category.categoryName} onChange={(e) => setCategoryName(e.target.value)} />
          </div>
          <div>
            <button className="admin-category__btn btn--green" type="submit">
              submit
            </button>
            <button className="admin-category__btn btn--green" type="button" onClick={() => setEditMode(false)}>
              cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <h3>{category.categoryName}</h3>
          <p>Words: {category.cards.length}</p>
          <div className="admin-category__btns">
            <button className="admin-category__btn btn--green" onClick={() => setEditMode(true)}>
              Update
            </button>
            <NavLink
              to={{ pathname: `${category.categoryName}/words`, state: category.cards }}
              className="admin-category__btn btn--green"
            >
              Add word
            </NavLink>
            <button onClick={() => deleteCategory(category._id || '')}>X</button>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminCategory;
