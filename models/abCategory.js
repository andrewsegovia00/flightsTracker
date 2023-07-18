const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categoryABSchema = new Schema({
    name: {
      type: String,
      required: true
    },
  }, {
    timestamps: true
  });


module.exports = mongoose.model('CategoryAB', categoryABSchema);
