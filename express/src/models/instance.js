import mongoose from 'mongoose';

const instanceSchema = new mongoose.Schema({
  name: String,
  description: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  flavour: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Flavour'
  },
  datasets: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Dataset'
  }]
});

const Instance = mongoose.model('Instance', instanceSchema);

export default Instance;