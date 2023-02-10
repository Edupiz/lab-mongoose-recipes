const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

let pisto = {
  "title": "Pisto",
  "level": "Easy Peasy",
  "ingredients": [
    "1 fresh onion",
    "1 spoon of olive oil",
    "1/3 spoon of salt",
    "1 natural tomato",
    "lots of vegetables"
  ],
  "cuisine": "de la guena",
  "dishType": "breakfast",
  "image": "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
  "duration": 2,
  "creator": "El guardian de las estrellas"
}

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
     // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(()=>{
    return Recipe.create(pisto);
  })
  .then(() => {
    let recetillas = [];
    data.forEach(element => {
      console.log(element.title);
      let recetilla = Recipe.create(element)
      recetillas.push(recetilla);
    });
     return Promise.all(recetillas);
    })
  .then(() => {
   return Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100}, {new: true})  
  })
  .then(() => {
   return console.log("Rigatoni duration changed ok");  
  })
  .then(() => {
    return Recipe.deleteOne({title: "Carrot Cake"})
  })
  .then(() =>{
    console.log("me voy a desconectar")
    mongoose.disconnect();
    process.kill(process.pid);
  })
    // Run your code here, after you have insured that the connection was made
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
