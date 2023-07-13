const Journey = require('../models/journey');
// const Performer = require('../models/performer');

module.exports = {
  index,
  show,
  new: newJourney,
  create
};

async function index(req, res) {
  const journeys = await Journey.find({});
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
  res.render('journeys/show', { title: `${journey.destination}`, journey });
}

function newJourney(req, res) {
  // We'll want to be able to render an  
  // errorMsg if the create action fails
  res.render('dashboard/new', { title: 'Add Journey', errorMsg: '' });
}

async function create(req, res) {
  // convert nowShowing's checkbox of nothing or "on" to boolean

  // req.body.nowShowing = !!req.body.nowShowing;

  // Remove empty properties so that defaults will be applied
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key];
  }
  console.log(req.body);
  req.body.user = req.user._id;
  req.body.userName = req.user.name;
  req.body.userAvatar = req.user.avatar;

  try {
    // Update this line because now we need the _id of the new movie
    const journey = await Journey.create(req.body);

    // journey.push(req.body);

    // Redirect to the new movie's show functionality 
    res.redirect(`/dashboard`, {title: "All Journeys"}, {journeys: journey});
  } catch (err) {
    // Typically some sort of validation error
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

