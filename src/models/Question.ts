import { model, Schema } from 'mongoose';

const QuestionSchema: Schema = new Schema({
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