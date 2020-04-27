import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    index: { unique: true }
  },
  role: {
    type: String,
    required: true,
    default: 'user'
  },
  password: String,
});


userSchema.pre('remove', function (next) {
  this.model('Message').deleteMany({
    user: this._id
  }, next);
});

const User = mongoose.model('User', userSchema);

export default User;