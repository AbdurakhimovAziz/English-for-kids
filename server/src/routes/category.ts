import { Router } from 'express';
import mongoose from 'mongoose';
import CategoryModel from '../models/CategoryModel';
import { ICategory } from '../models/ICategory';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const allCategories = await CategoryModel.find();
    return res.json(allCategories);
  } catch (error) {
    return res.status(400);
  }
});

router.post('/', async (req, res) => {
  try {
    const category: ICategory = req.body;
    const newCategory = new CategoryModel(category);
    await newCategory.save();

    return res.send(newCategory);
  } catch (error) {
    return res.send({ error });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const { id: _id } = req.params;
    const updatedCategory: ICategory = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).send({ message: 'not found' });
    }

    const category = await CategoryModel.findByIdAndUpdate(
      _id,
      updatedCategory,
      { new: true }
    );
    return res.send({ category });
  } catch (error) {
    return res.status(500).send({ error });
  }
});

router.delete('/:id', async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send({ message: 'not found' });
  }

  await CategoryModel.findByIdAndDelete(_id);
  return res.send({ message: 'success' });
});

export default router;
