require('dotenv').config();

// Install and Set Up Mongoose
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });

// Create a Model
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: Number,
  favoriteFoods: [String]
})

const Person = mongoose.model('Person', personSchema);

// Create and Save a Record of a Model
const createAndSavePerson = (done) => {
  let person1 = new Person({name: "Person 1", age: 30, favoriteFoods:["noodles"]});
  person1.save().then(doc => {
    done(null, doc);
  }).catch(err => {
    console.error(err);
  })
};

// Create Many Records with model.create()
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople).then(doc => {
    done(null, doc);
  }).catch(err => {
    console.error(err);
  })
};

// Use model.find() to Search Your Database
const findPeopleByName = (personName, done) => {
  Person.find({name: personName}).then(doc => {
    done(null, doc);
  }).catch(err => {
    console.error(err);
  })
};

// Use model.findOne() to Return a Single Matching Document from Your Database
const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}).then(doc => {
    done(null, doc);
  }).catch(err => {
    console.error(err);
  })
};

// Use model.findById() to Search Your Database By _id
const findPersonById = (personId, done) => {
  Person.findById(personId).then(doc => {
    done(null, doc);
  }).catch(err => {
    console.error(err);
  })
};

// Perform Classic Updates by Running Find, Edit, then Save
const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, function(err, doc){
    if (err) return console.error(err);
    doc.favoriteFoods.push(foodToAdd);
    doc.save((err, updatedPerson) => {
      if(err) return console.error(err);
      done(null, updatedPerson);
    })
  })
};

// Perform New Updates on a Document Using model.findOneAndUpdate()
const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, {age: 20}, { new: true }, (err, doc) => {
    if(err) return console.error(err);
    done(null, doc);
  })
};

// Delete One Document Using model.findByIdAndRemove
const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, doc) => {
    if(err) return console.error(err);
    done(null, doc);
  })
};

// Delete Many Documents with model.remove()
const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, (err, result) => {
    if(err) return console.error(err);
    done(null, result);
  } )
};

// Chain Search Query Helpers to Narrow Search Results
const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.
    find({favoriteFoods: foodToSearch}).
    sort('name').
    limit(2).
    select('-age').
    exec((err, data) => {
      if(err) return console.error(err);
      done(null, data)
    });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;