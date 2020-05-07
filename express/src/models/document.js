import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema({
  title: String,
  img: String,
  summary: String,
  type: String,
  citation: String,
  doi: String,
  licence: String,
  isPublic: Boolean,
  startDate: Date,
  releaseDate: Date,
  endDate: Date,
  keywords: Array,
  members: [{
    name: String,
    affiliation: String,
    role: String
  }],
  datasets: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Dataset'
  }]
});

const Document = mongoose.model('Document', documentSchema);

export default Document;