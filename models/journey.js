const journeySchema = new Schema({
    Destination: {
      type: String,
      required: true
    },
    // rating: {
    //   type: Number,
    //   min: 1,
    //   max: 5,
    //   default: 5
    // }
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    userName: String,
    userAvatar: String
  }, {
    timestamps: true
  });