import { model, Schema } from 'mongoose';

const QuestionSchema: Schema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
});

export default model('Question', QuestionSchema);