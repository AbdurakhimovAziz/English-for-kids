import React from 'react';

export interface AddElementProps {
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddElement: React.FC<AddElementProps> = ({ setEditMode }) => {
  return <button className="add__btn" onClick={() => setEditMode(true)}></button>;
};

export default AddElement;
