import React from 'react';
import AdminCategory from '../../../components/adminCategoryCard/adminCategory';
import useTypeSelector from '../../../hooks/useTypeSelector';
import './admin-categories.scss';

const AdminCategories: React.FC = () => {
  const { cardCategories } = useTypeSelector((state) => state.categories);
  return (
    <div className="admin-categories">
      {cardCategories && cardCategories.map((category, index) => <AdminCategory category={category} key={index} />)}
    </div>
  );
};

export default AdminCategories;
