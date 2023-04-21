const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://0.0.0.0/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {

    // Run your code here, after you have insured that the connection was made

    const details =
    {
      title: 'Chicken',
      level: 'Amateur Chef',
      ingredients: ['salt', 'pepper'],
      cuisine: 'southern',
      dishType: 'main_course',
      image: null,
      duration: 3,
      creator: 'Lee',
      created: null,
    }

    return Recipe.create(details)
      .then(recipe => console.log('Title: ', recipe))
      .catch(error => console.log('Error: ', error))
  })
  .then(() => {
    return Recipe.insertMany(data)
    // console.log(Recipe.find({}, 'title'))
  })
  .then(() => {
    const query = { title: 'Rigatoni alla Genovese' }
    return Recipe.findOneAndUpdate(query, { duration: 100 }, { new: true })
  })
  .then(() => {
    return Recipe.deleteOne({ name: 'Carrot Cake' })
  })
  .then(() => {
    mongoose.connection.close(function () {
      console.log('Mongoose default connection closed');
    });
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
