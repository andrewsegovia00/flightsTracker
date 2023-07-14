const Journey = require('../models/journey');

module.exports = {
  create,
  // Add this export
  delete: deleteExpense
};

async function deleteExpense(req, res) {
  // Note the cool "dot" syntax to query on the property of a subdoc
  const journey = await Journey.findOne({ 'expenses._id': req.params.id});
  // Rogue user!
  if (!journey) return res.redirect('/dashboard');
  // Remove the review using the remove method available on Mongoose arrays
  journey.actualBudget.expenses.remove(req.params.id);
  // Save the updated movie doc
  await journey.save();
  // Redirect back to the movie's show view
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

async function create2(req, res) {
    const journey = await Journey.findById(req.params.id);

    journey.simulatedlBudget[0].categories.push(req.body);
    console.log(req.body)
    try {
      await journey.save();
    } catch (err) {
      console.log(err);
    }
    res.redirect(`/dashboard/${journey._id}`);
  }