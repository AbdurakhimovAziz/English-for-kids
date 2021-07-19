import React, { useState } from 'react';
import AdminCategory from '../../../components/adminCategoryCard/adminCategory';
import useActions from '../../../hooks/useActions';
import useTypeSelector from '../../../hooks/useTypeSelector';
import './admin-categories.scss';

const AdminCategories: React.FC = () => {
  const { createCategory } = useActions();
  const { cardCategories } = useTypeSelector((state) => state.categories);
  const [categoryName, setCategoryName] = useState('');

  return (
    <div className="admin-categories">
      {cardCategories && cardCategories.map((category, index) => <AdminCategory category={category} key={index} />)}
      <div className="admin-category">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createCategory({ categoryName, cards: [] });
            setCategoryName('');
          }}
        >
          <div>
            <input type="text" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} required />
          </div>
          <div>
            <button className="admin-category__btn btn--green" type="submit">
              create
            </button>
            <button className="admin-category__btn btn--green" type="button">
              cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminCategories;
