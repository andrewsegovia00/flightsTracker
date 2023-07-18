const Journey = require('../models/journey');

module.exports = {
  index,
  show,
  new: newJourney,
  create
};

async function index(req, res) {
  const journeys = await Journey.find({ user: req.user._id });
  res.render('dashboard/index', { title: 'My Journeys', journeys: journeys });
}

// async function show(req, res) {
//   const journey = await Journey.findById(req.params.id);
//   res.render('dashboard/show', { title: `${journey.destination}`, journey: journey });
// }

async function show(req, res) {
  const journey = await Journey.findById(req.params.id).populate('actualBudget.category');
  res.render('dashboard/show', { title: `${journey.destination}`, journey: journey });
}


function newJourney(req, res) {
  res.render('dashboard/new', { title: 'Add Journey', errorMsg: '' });
}

// async function create(req, res) {
//   for (let key in req.body) {
//     if (req.body[key] === '') delete req.body[key];
//   }
//   req.body.user = req.user._id;

//   try {
//     const journey = await Journey.create(req.body);

//     journey.actualBudget = { expenses: [], categories: [] };
//     journey.simulatedBudget = { categories: [] };
//     journey.save();

//     res.redirect(`/dashboard`, {title: "All Journeys"}, {journeys: journey});
//   } catch (err) {
//     console.log(err);
//     res.render('dashboard/new', { errorMsg: err.message });
//   }
// }
async function create(req, res) {
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key];
  }
  req.body.user = req.user._id;

  try {
    const journey = await Journey.create(req.body);

    journey.actualBudget = { expenses: [], category: [] }; // Update categories to category here
    journey.simulatedBudget = { category: [] }; // Update categories to category here
    await journey.save();

    res.redirect(`/dashboard`, { title: "All Journeys" }, { journeys: journey });
  } catch (err) {
    console.log(err);
    res.render('dashboard/new', { errorMsg: err.message });
  }
}
