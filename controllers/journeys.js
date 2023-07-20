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
  const {destination, actTotal, simTotal} = req.body;
  const journey = await Journey.findOne({ user: req.user._id, _id: req.params.id });
  try{
    let actTotals = journey.actualBudget.totalBudget;
    let simTotals = journey.simulatedBudget.totalBudget;
    console.log(actTotals)
    console.log(simTotals)
    console.log(actTotal)
    console.log(simTotal)
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

// Assuming you have a model named 'Expense' for expenses and 'Category' for categories

// async function getTopCategories(journey) {
//   try {
//     const categoryExpensesMap = new Map();

//     journey.actualBudget.expenses.forEach((expense) => {
//       const categoryId = expense.category ? expense.category.toString() : null;
//       const expenseAmount = expense.price;

//       if (categoryId !== null) {
//         if (categoryExpensesMap.has(categoryId)) {
//           categoryExpensesMap.set(categoryId, categoryExpensesMap.get(categoryId) + expenseAmount);
//         } else {
//           categoryExpensesMap.set(categoryId, expenseAmount);
//         }
//       }
//     });

//     const categoryExpensesArray = Array.from(categoryExpensesMap, ([categoryId, totalExpenses]) => ({
//       categoryId,
//       totalExpenses,
//     }));

//     categoryExpensesArray.sort((a, b) => b.totalExpenses - a.totalExpenses);

//     const top5Categories = categoryExpensesArray.slice(0, 5);

//     const top5CategoriesDetails = await Category.find({
//       _id: { $in: top5Categories.map((category) => category.categoryId) },
//     });

//     const topCategoriesWithExpenses = top5Categories.map((category) => {
//       const categoryDetails = top5CategoriesDetails.find((c) => c.toString() === category.categoryId);
//       return {
//         category: categoryDetails,
//         totalExpenses: category.totalExpenses,
//       };
//     });

//     return topCategoriesWithExpenses;
//   } catch (err) {
//     console.error(err);
//     throw err;
//   }
// }


async function index(req, res) {
  const journeys = await Journey.find({ user: req.user._id });
  res.render('dashboard/index', { title: 'My Journeys', journeys: journeys});
}

async function show(req, res) {
  const journey = await Journey.findById(req.params.id).populate('actualBudget.category').populate('actualBudget.expenses.category');

  // const topCategoriesData = await getTopCategories(journey);
  // console.log(topCategoriesData) 
  // console.log("topCategoriesData") 

  res.render('dashboard/show', { title: `${journey.destination}`, journey: journey});
}


function newJourney(req, res) {
  res.render('dashboard/new', { title: 'Add Journey', errorMsg: '' });
}

async function create(req, res) {
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key];
  }
  req.body.user = req.user._id;
  console.log(req.body)

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