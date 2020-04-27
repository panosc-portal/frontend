import mongoose from 'mongoose';

const datasetSchema = new mongoose.Schema({

  title: String,
  isPublic: Boolean,
  size: Number,
  creationDate: Date,
  instrument: {
    name: String,
    facility: String
  },
  technique: String
});

const Dataset = mongoose.model('Dataset', datasetSchema);

export default Dataset;