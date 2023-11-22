import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const usersSchema = new Schema({
  username: {
    type: String,
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
