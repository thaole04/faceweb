import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const controlSchema = new Schema({
  time: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});

const Control =
  mongoose.models.Control || mongoose.model('Control', controlSchema);

export default Control;
