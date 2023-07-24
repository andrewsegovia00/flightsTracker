const Category = require('../models/abCategory');
const Journey = require('../models/journey');

module.exports = {
  index,
  show,
  new: newJourney,
  create,
  delete: deleteJourney,
  updateJourney,
};

async function updateJourney(req, res) {
  req.body.actTotal = parseFloat(req.body.actTotal).toFixed(2);
  req.body.simTotal = parseFloat(req.body.simTotal).toFixed(2);
  const {destination, actTotal, simTotal} = req.body;
  const journey = await Journey.findOne({ user: req.user._id, _id: req.params.id });
  try{
    let actTotals = journey.actualBudget.totalBudget;
    let simTotals = journey.simulatedBudget.totalBudget;
    if(actTotals !== actTotal && actTotal !== '' && actTotal >= 0)
    {
      journey.actualBudget.totalBudget = actTotal;
    }
    if(simTotals !== simTotal && simTotal !== '' && simTotal >= 0)
    {
      journey.simulatedBudget.totalBudget = simTotal;
    }
    if(journey.destination !== destination && destination !== '')
    {
      journey.destination = destination;
    }
    await journey.save();
    res.redirect(`/dashboard/${journey._id}`);
  } catch (err) {
    console.log(err);
  }
}

async function getTopCategories(journey) {
  try {
    const categoryExpensesMap = new Map();
    journey.actualBudget.expenses.forEach((expense) => {
      const categoryId = expense.category ? expense.category._id : null;
      const expenseAmount = expense.price;

      if (categoryId !== null) {
        if (categoryExpensesMap.has(categoryId)) {
          categoryExpensesMap.set(categoryId, categoryExpensesMap.get(categoryId) + expenseAmount);
        } else {
          categoryExpensesMap.set(categoryId, expenseAmount);
        }
      } else {
        const naCategoryId = "__NA__";
        if (categoryExpensesMap.has(naCategoryId)) {
          categoryExpensesMap.set(naCategoryId, categoryExpensesMap.get(naCategoryId) + expenseAmount);
        } else {
          categoryExpensesMap.set(naCategoryId, expenseAmount);
        }
      }
    });
    const categoryExpensesArray = Array.from(categoryExpensesMap, ([categoryId, totalExpenses]) => ({
      categoryId,
      totalExpenses,
      categoryName: categoryId === "__NA__" ? "__NA__" : journey.actualBudget.expenses.find((expense) => expense.category?._id === categoryId)?.category.name,
    }));

    categoryExpensesArray.sort((a, b) => {
      if (a.categoryName === "__NA__") return 1;
      if (b.categoryName === "__NA__") return -1;
      return b.totalExpenses - a.totalExpenses;
    });

    const top5Categories = categoryExpensesArray.slice(0, 5);
    return top5Categories;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function getTopSimCategories(journey) {
  try {
    const categoryExpenses = [];
    journey.simulatedBudget.category.forEach((cat) => {
      const catAmount = cat.price ? cat.price : null;
      const catName = cat.name ? cat.name : null;
      categoryExpenses.push({catName, catAmount});
    });

    console.log(categoryExpenses)
    console.log("CL 4000")
    categoryExpenses.sort((a, b) => {
      if (a.catName === null) return 1;
      if (b.catName === null) return -1;
      return b.catAmount - a.catAmount;
    });

    const top5Categories = categoryExpenses.slice(0, 5);
    console.log(top5Categories)
    console.log("CL 5000")
    return top5Categories;
    
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function show(req, res) {
  try {
    const journey = await Journey.findById(req.params.id)
      .populate('actualBudget.category')
      .populate('actualBudget.expenses.category');

    const topCategories = await getTopCategories(journey);
    const topCategoriesSim = await getTopSimCategories(journey);

    const isJsonResponse = req.query.format === 'json';
    if (isJsonResponse) {
      res.json(topCategories);
      res.render('dashboard/show', { title: `${journey.destination}`, journey: journey, topCategoriesAB: topCategories, topCategoriesSim: topCategoriesSim });
    } else {
      res.render('dashboard/show', { title: `${journey.destination}`, journey: journey, topCategoriesAB: topCategories, topCategoriesSim: topCategoriesSim });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


  
async function index(req, res) {
  const journeys = await Journey.find({ user: req.user._id });
  res.render('dashboard/index', { title: 'My Journeys', journeys: journeys});
}


function newJourney(req, res) {
  res.render('dashboard/new', { title: 'Add Journey', errorMsg: '' });
}

async function create(req, res) {
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key];
  }
  req.body.user = req.user._id;

  try {
    const journey = await Journey.create(req.body);

    journey.actualBudget = { expenses: [], category: [] }; 
    journey.simulatedBudget = { category: [] }; 

    journey.actualBudget.totalBudget = req.body.actTotal;
    journey.simulatedBudget.totalBudget = req.body.simTotal;

    await journey.save();
    res.redirect(`/dashboard`, { title: "All Journeys" }, { journeys: journey });
  } catch (err) {
    console.log(err);
    res.render('dashboard/new', { errorMsg: err.message });
  }
}

async function deleteJourney(req, res) {
  const journey = await Journey.findOneAndDelete({ user: req.user._id, _id: req.params.id });
    if (!journey) return res.redirect('/dashboard');
    res.redirect(`/dashboard`);
}