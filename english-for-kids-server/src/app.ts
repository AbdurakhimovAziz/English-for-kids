import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import categories from './routes/category';
import user from './routes/user';
import words from './routes/words';

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use('/categories', categories);
app.use('/words', words);
app.use('/login', user);

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || '', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log('connected to mongo database');
    app.listen(PORT, () => console.log(`listening on port : ${PORT}`));
  } catch (error) {
    console.error(error);
  }
};

start();
