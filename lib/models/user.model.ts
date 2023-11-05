import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const usersSchema = new Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const Users = mongoose.models.Users || mongoose.model('Users', usersSchema);

export default Users;
