import mongoose from 'mongoose';

const flavourSchema = new mongoose.Schema({
  name: String,
  type: String,
  cpu: String,
  gpu: String,
});

const Flavour = mongoose.model('Flavour', flavourSchema);

export default Flavour;