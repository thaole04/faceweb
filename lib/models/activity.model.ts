import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const activitiesSchema = new Schema({
  time: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  secured: {
    type: Boolean,
    required: true,
  }
});

const Activities =
  mongoose.models.Activities || mongoose.model('Activities', activitiesSchema);

export default Activities;
