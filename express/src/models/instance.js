import mongoose from "mongoose";

const instanceSchema = new mongoose.Schema({
  name: String,
  description: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  flavour: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Flavour",
  },
  datasets: [String],
});

const Instance = mongoose.model("Instance", instanceSchema);

export default Instance;
