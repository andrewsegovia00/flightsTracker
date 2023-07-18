const Journey = require('../models/journey');

module.exports = {
  create,
  createCategory,
  createCategory2,
  delete: deleteExpense,
  deleteSimCat: deleteCategories,
  updateExp,
  updateCat,
  updateSimCat,
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

async function deleteCategories(req, res) {
  const journey = await Journey.findOne({ 'user': req.user._id, 'simulatedBudget.category._id': req.params.id});

  if (!journey) return res.redirect('/dashboard');

    const categoryIndex = journey.simulatedBudget.category.findIndex(
      (category) => category._id.toString() === req.params.id
    );
    journey.simulatedBudget.category.splice(categoryIndex, 1);

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

  async function updateExp(req, res)
  {
    console.log(req.body);
    const { title, price, expenseDate, category } = req.body;
    const journey = await Journey.findOne({ 'user': req.user._id, 'actualBudget.expenses._id': req.params.id});

    if (!journey) return res.redirect('/dashboard')

    const expenseIndex = journey.actualBudget.expenses.findIndex(
            (expense) => expense._id.toString() === req.params.id);
    const expense = journey.actualBudget.expenses[expenseIndex];
    if(expense.title !== title && title !== '')
    {
      expense.title = title;
    }
    else
    {
      expense.title = expense.title
    }
    if(expense.price !== price && price !== '')
    {
      expense.price = price;
    }
    else
    {
      expense.price = expense.price
    }
    if(expense.category !== category && category !== '')
    {
      expense.category.push(category);
    }
    else
    {
      expense.price = expense.price
    }
    if(expense.expenseDate !== expenseDate)
    {
      expense.expenseDate = expenseDate ;
    }

    journey.markModified('actualBudget.expenses');

    await journey.save();

    res.redirect(`/dashboard/${journey._id}`);
  }

  async function updateCat(){}

  async function updateSimCat(req, res){
    console.log(`we made it here 2020202020`)
    console.log(req.body)
    console.log(req.params.id)
    
    const { name, price } = req.body;
    const journey = await Journey.findOne({ 'user': req.user._id, 'simulatedBudget.category._id': req.params.id});

    if (!journey) return res.redirect('/dashboard')

    const categoryIndex = journey.simulatedBudget.category.findIndex(
            (cat) => cat._id.toString() === req.params.id);

    const category = journey.simulatedBudget.category[categoryIndex];

    if(category.name !== name && name !== '')
    {
      category.name = name;
    }
    else
    {
      category.name = category.name
    }
    if(category.price !== price && price !== '')
    {
      category.price = price;
    }
    else
    {
      category.price = category.price
    }

    journey.markModified('actualBudget.expenses');

    await journey.save();

    res.redirect(`/dashboard/${journey._id}`);
  }
