import React from 'react';
import { NavLink, useRouteMatch } from 'react-router-dom';
import { ICategory } from '../../models/ICategory';
import './adminCategory.scss';

export interface Props {
  category: ICategory;
}

const AdminCategory: React.FC<Props> = ({ category }) => {
  const { url } = useRouteMatch();
  return (
    <div className="admin-category">
      <h3>{category.categoryName}</h3>
      <p>Words: {category.cards.length}</p>
      <div className="admin-category__btns">
        <button className="admin-category__btn btn--green">Update</button>
        <NavLink
          to={{ pathname: `${category.categoryName}/words`, state: category.cards }}
          className="admin-category__btn btn--green"
        >
          Add word
        </NavLink>
      </div>
    </div>
  );
};

export default AdminCategory;
