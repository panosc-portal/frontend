import mongoose from 'mongoose';

import User from './user';
import Document from './document';
import Dataset from './dataset';
import Instance from './instance';
import Flavour from './flavour';

const connectDb = () => {
  return mongoose.connect(process.env.DATABASE_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  });
};

const models = {
  User,
  Document,
  Dataset,
  Instance,
  Flavour
};

export {
  connectDb
};

export default models;