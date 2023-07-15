const Journey = require('../models/journey');

module.exports = {
  index,
  show,
  new: newJourney,
  create
};

async function index(req, res) {
  // const journeys = await Journey.find({});
  console.log(req.body)
  const journeys = await Journey.find({});
  console.log(journeys);
  res.render('dashboard/index', { title: 'My Journeys', journeys: journeys });
}

async function show(req, res) {
  // Populate the cast array with performer docs instead of ObjectIds
  // const expense = await Expense.findById(req.params.id).populate('category'); 

  const journey = await Journey.findById(req.params.id);

  // Mongoose query builder approach to retrieve performers not the movie:
    // Performer.find({}).where('_id').nin(movie.cast)
  // The native MongoDB approach uses a query object to find 
  // performer docs whose _ids are not in the movie.cast array like this:
  // const performers = await Performer.find({ _id: { $nin: movie.cast } }).sort('name');
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

  try {
    const journey = await Journey.create(req.body);

    journey.actualBudget = { expenses: [], categories: [] };
    journey.simulatedBudget = { categories: [] };
    journey.save();

    res.redirect(`/dashboard`, {title: "All Journeys"}, {journeys: journey});
  } catch (err) {
    console.log(err);
    res.render('dashboard/new', { errorMsg: err.message });
  }
}

// async function create(req, res) {
//   const journey = await Journey.findById(req.params.id);

  
//   req.body.user = req.user._id;
//   req.body.userName = req.user.name;
//   req.body.userAvatar = req.user.avatar;

  
//   Journey.push(req.body);
//   try {
    
//     await trip.save();
//   } catch (err) {
//     console.log(err);
//   }
//   res.redirect(`/trips/${journey._id}`);
// }

