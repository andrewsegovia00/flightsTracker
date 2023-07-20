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

async function index(req, res) {
  const journeys = await Journey.find({ user: req.user._id });
  res.render('dashboard/index', { title: 'My Journeys', journeys: journeys });
}

async function show(req, res) {
  const journey = await Journey.findById(req.params.id).populate('actualBudget.category').populate('actualBudget.expenses.category');
  res.render('dashboard/show', { title: `${journey.destination}`, journey: journey });
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