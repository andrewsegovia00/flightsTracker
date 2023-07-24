const CategoryAB = require('../models/abCategory');
const Journey = require('../models/journey');

module.exports = {
  createCategory,
  createCategory2,
  deleteSimCat: deleteCategories,
  deleteCat,
  updateSimCat,
  addToCategoryArray,
};

async function deleteCategories(req, res) {
  const journey = await Journey.findOne({ 'user': req.user._id, 'simulatedBudget.category._id': req.params.id});

  if (!journey) return res.redirect('/dashboard');

    const categoryIndex = journey.simulatedBudget.category.findIndex(
      (category) => category._id.toString() === req.params.id
    );
    journey.simulatedBudget.category.splice(categoryIndex, 1);
  await journey.save();
  res.redirect('back');
}

async function deleteCat(req, res) {
  const journey = await Journey.findOne({ 'user': req.user._id, 'actualBudget.category': req.body.category});

  if (!journey) return res.redirect('/dashboard');
  const categoryIndex = journey.actualBudget.category.findIndex(
    (category) => category._id.toString() === req.body.category
  );
  journey.actualBudget.category.splice(categoryIndex, 1);

  for (let i = 0; i < journey.actualBudget.expenses.length; i++) {
    if (journey.actualBudget.expenses[i].category && journey.actualBudget.expenses[i].category.toString() === req.body.category) {
      journey.actualBudget.expenses[i].category = undefined;
    }
  }
  await journey.save();
  await CategoryAB.findOneAndDelete({'_id': req.body.category})
  res.redirect('back');
}

async function createCategory(req, res) {
  const journey = await Journey.findById(req.params.id);
  const actualBudget = journey.actualBudget;
    try {
      const newCat = await CategoryAB.create(req.body); 
      console.log(newCat)
      actualBudget.category.push(newCat._id);
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
  res.redirect('back');
}

async function addToCategoryArray(req, res) {
const journey = await Journey.findById(req.params.id);
journey.category.push(req.body.categoryabsId);
await journey.save();
res.redirect(`/dashboard/${journey._id}`);
}

  async function updateSimCat(req, res){
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
    res.redirect('back');
  }
