import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const activitieSchema = new Schema({
  time: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
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

const Activities =
  mongoose.models.Activities || mongoose.model('Activities', activitieSchema);

export default Activities;
