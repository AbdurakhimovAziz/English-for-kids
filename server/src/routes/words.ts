import { Router } from 'express';
import mongoose from 'mongoose';
import CategoryModel from '../models/CategoryModel';
import { ICard } from '../models/ICard';

const router = Router();

router.post('/:id', async (req, res) => {
  const { id: _id } = req.params;
  const newWord: ICard = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send({ message: 'not found' });
  }
  try {
    const category = await CategoryModel.findById(_id);

    if (!category) return res.status(404).send({ message: 'not found' });

    const updatedCategory = await CategoryModel.findByIdAndUpdate(
      _id,
      {
        $push: { cards: newWord },
      },
      { new: true }
    );
    return res.send(updatedCategory);
  } catch (error) {
    return res.status(400).send(error);
  }
});

router.delete('/:id', async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send({ message: 'not found' });
  }
  try {
    const updatedCategory = await CategoryModel.findOneAndUpdate(
      {
        'cards._id': new mongoose.Types.ObjectId(_id),
      },
      {
        $pull: {
          cards: {
            _id: new mongoose.Types.ObjectId(_id),
          },
        },
      },
      {
        new: true,
      }
    );
    return res.send(updatedCategory);
  } catch (error) {
    return res.status(400).send(error);
  }
});

router.patch('/:id', async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send({ message: 'not found' });
  }
  const updatedWord = req.body;

  try {
    const updatedCategory = await CategoryModel.findOneAndUpdate(
      {
        'cards._id': new mongoose.Types.ObjectId(_id),
      },
      {
        $set: {
          'cards.$[word]': updatedWord,
        },
      },
      {
        new: true,
        arrayFilters: [
          {
            'word._id': new mongoose.Types.ObjectId(_id),
          },
        ],
      }
    );
    return res.send(updatedCategory);
  } catch (error) {
    return res.status(400).send(error);
  }
});

export default router;
