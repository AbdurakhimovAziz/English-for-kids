import React from 'react';

export interface DeleteElementProps {
  clickHandler: React.MouseEventHandler;
}

const DeleteElement: React.FC<DeleteElementProps> = ({ clickHandler }) => {
  return <button className="admin__delete-btn" onClick={clickHandler}></button>;
};

export default DeleteElement;
