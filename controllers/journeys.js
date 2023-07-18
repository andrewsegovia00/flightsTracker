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
  console.log(journey)
  try{
    let actTotals = journey.actualBudget.total;
    let simTotals = journey.simulatedBudget.total;
    if(actTotals !== actTotal && actTotal !== '' && actTotal >= 0)
    {
      actTotals = actTotal;
    }
    else
    {
      actTotals = actTotals;
    }
    if(simTotals !== simTotal && simTotal !== '' && simTotal >= 0)
    {
      simTotals = simTotal;
    }
    else
    {
      simTotals = simTotals;
    }
    if(journey.destination !== destination && destination !== '')
    {
      journey.destination = destination;
    }
    else
    {
      journey.destination = journey.destination;
    }
    await journey.save();
    res.redirect(`/dashboard/${journey._id}`);
  } catch (err) {
    console.log(err);
  }
}

async function index(req, res) {
  const journeys = await Journey.find({ user: req.user._id });
  res.render('dashboard/index', { title: 'My Journeys', journeys: journeys });
}

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
async function deleteJourney(req, res) {
  const journey = await Journey.findOneAndDelete({ user: req.user._id, _id: req.params.id });
  
    if (!journey) return res.redirect('/dashboard');
  
    res.redirect(`/dashboard`);
}