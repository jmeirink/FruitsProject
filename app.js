//jshint esversion:6

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/fruitsDB', { useNewUrlParser: true });

const fruitSchema = new mongoose.Schema ({
  name: {
    type: String,
    required: [true, "Please check your data entry, no entry specified!"]
  },
  rating: {
    type: Number,
    min: 1,
    max: 10
  },
  review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit ({
  rating: 10,
  review: "Peaches are so yummy!"
});

// fruit.save();

const personSchema = new mongoose.Schema ({
  name: String,
  age: Number
});

const Person = mongoose.model("Person", personSchema);

const person = new Person ({
  name: "John",
  age: 37
});

// person.save();


Fruit.find(function(err, fruits){
  if (err) {
    console.log(err);
  } else {

    // mongoose.connection.close();

    fruits.forEach(function(fruit){
      console.log(fruit.name);
    });
  }
});


// Fruit.updateOne({_id: "5bc0854dd6ec7ad010738bc7"}, {name: "Peach"}, {function(err){
//   if (err){
//     console.log(err);
//   } else {
//     console.log("Succesfully updated the document");
//   }
// });

// Fruit.deleteOne({name: "Peach"}, function(err){
//   if (err){
//     console.log(err);
//   } else {
//     console.log("Succesfully deleted the document");
//   }
// });

Person.deleteMany({name: "John"}, function(err){
  if (err){
    console.log(err);
  } else {
    console.log("Succesfully deleted all the documents");
  }
});





const findDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('fruits');
  // Find some documents
  collection.find({}).toArray(function(err, fruits) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(fruits);
    callback(fruits);
  });
};
