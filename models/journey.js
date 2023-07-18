const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const expensesSchema = require('../models/expense');
const categoryABSchema = require('../models/abCategory');

const expensesSchema = new Schema({
  title: {
      type: String,
      required: true,
      default: 'Insert Name'
  },
  price: {
      type: Number,
      required: true,
      default: 0,
  },
 expenseDate: {
      type: Date,
      required: Date,
      default: function() {
          return new Date;
      }
  },  
  category: [],
}, {
  timestamps: true
});

const actualBudgetSchema = new Schema({
  category: [
    {
        type: Schema.Types.ObjectId,
        ref: 'CategoryAB',
    }
  ],
  expenses: [expensesSchema], 
    totalBudget: {
      type: Number,
      default: 0,
  }
    },
  {
    timestamps: true
  });

  const categorySBSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    price: {
        type: Number,
    }
  }, {
    timestamps: true
  });

  const simulatedBudgetSchema = new Schema({
    category: [categorySBSchema],
    totalBudget: {
        type: Number,
        default: 0,
    }
  }, {
    timestamps: true
  });

const journeySchema = new Schema({
    destination: {
      type: String,
      required: true
    },
    actualBudget: actualBudgetSchema,
    simulatedBudget: simulatedBudgetSchema,
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
  }, {
    timestamps: true
  });

  module.exports = mongoose.model('Journey', journeySchema);