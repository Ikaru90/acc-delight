import { model, Schema } from 'mongoose';

const UserSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  avatarURL: {
    type: String,
    default: '',
  },
  chatRoomList: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Room',
    },
  ],
  newsRoomList: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Room',
    },
  ],
  password: {
    type: String,
    default: '1',
    required: true,
  },
  enterpriseId: {
    type: String,
    default: '',
    required: true,
  },
});

export default model('User', UserSchema);
