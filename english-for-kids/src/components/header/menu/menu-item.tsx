import React from 'react';

interface Props {
  children: React.ReactNode;
}

const MenuItem: React.FC<Props> = ({ children }) => {
  return <li className="menu__list-item">{children}</li>;
};

export default MenuItem;
