import { model, Schema } from 'mongoose';

const RoomSchema: Schema = new Schema({
  isPrivate: {
    type: Boolean,
    default: false,
  },
  isChatRoom: {
    type: Boolean,
    default: false,
  },
  userList: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  adminList: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  name: {
    type: String,
    required: true,
  },
  id: {
    type: Number,
    default: 0,
    required: true,
  },
});

export default model('Room', RoomSchema);

