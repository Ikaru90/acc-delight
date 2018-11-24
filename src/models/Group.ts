import { model, Schema } from 'mongoose';

const GroupSchema: Schema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  adminList: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  newsRoomId: {
    type: Number,
    default: 0,
  },
  isServiceRoom: {
    type: Boolean,
    default: false,
  },
  chatRoom: {
    type: Number,
    default: 0,
  },
  info: {
    type: String,
    default: '',
  },
});

export default model('Group', GroupSchema);