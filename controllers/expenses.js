const Journey = require('../models/journey');

module.exports = {
  create,
  createCategory,
  createCategory2,
  // Add this export
  delete: deleteExpense
};

async function deleteExpense(req, res) {
  const journey = await Journey.findOne({ 'user': req.user._id, 'actualBudget.expenses._id': req.params.id});

  if (!journey) return res.redirect('/dashboard');

    const expenseIndex = journey.actualBudget.expenses.findIndex(
      (expense) => expense._id.toString() === req.params.id
    );
    journey.actualBudget.expenses.splice(expenseIndex, 1);

  await journey.save();
  res.redirect(`/dashboard/${journey._id}`);
}

async function create(req, res) {
  const journey = await Journey.findById(req.params.id);

  const actualBudget = journey.actualBudget;
  actualBudget.expenses.push(req.body);
    console.log(actualBudget);
    console.log(req.body);
  try {
    await journey.save();
  } catch (err) {
    console.log(err);
  }
  res.redirect(`/dashboard/${journey._id}`);
}

async function createCategory(req, res) {
    const journey = await Journey.findById(req.params.id);
  
    const actualBudget = journey.actualBudget;
    actualBudget.category.push(req.body);
    try {
      await journey.save();
    } catch (err) {
      console.log(err);
    }
    res.redirect(`/dashboard/${journey._id}`);
  }

  async function createCategory2(req, res) {
    const journey = await Journey.findById(req.params.id);
  
    const simulatedBudget = journey.simulatedBudget;
    simulatedBudget.category.push(req.body);
    try {
      await journey.save();
    } catch (err) {
      console.log(err);
    }
    res.redirect(`/dashboard/${journey._id}`);
  }