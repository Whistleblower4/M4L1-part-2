const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const student = require('./models/model');

//asynchronous DB connection with parameterized DB connection string
mongoose.connect(`mongodb+srv://${process.env.ATLAS_USERNAME}:${process.env.ATLAS_PASSWORD}@${process.env.ATLAS_DBSERVER}/${process.env.DATABASE}`
,{useNewUrlParser: true})
    .then(() => console.log(`MongoDB connection succeeded with ${process.env.DATABASE}...`))
    .catch((err) => console.log('Error in DB connection: ' + err));

console.log(`The DB connection string is: 
mongodb+srv://${process.env.ATLAS_USERNAME}:vaibhavsolankivs@${process.env.ATLAS_DBSERVER}/${process.env.DATABASE}`);

// Testing 1st case: Trying to insert age less than 0
let student1 = new student({ name: 'John', age: -1, email: 'a@gmail.com', courses: [{ name: 'IFT458', grade: 90 }] });

student1.save()
  .then(() => console.log('Student 1 saved successfully'))
  .catch((err) => console.log(`Error in Student 1: ${err}`));

// Testing 2nd case: Trying to give the wrong email
let student2 = new student({ name: 'John', age: 10, email: 'a#gmail.com', courses: [{ name: 'IFT458', grade: 90 }] });

student2.save()
  .then(() => console.log('Student 2 saved successfully'))
  .catch((err) => console.log(`Error in Student 2: ${err}`));

// Testing 3rd case: Trying to insert grade greater than 100
let student3 = new student({ name: 'John', age: 10, email: 'a@gmail.com', courses: [{ name: 'IFT458', grade: 150 }] });

student3.save()
  .then(() => console.log('Student 3 saved successfully'))
  .catch((err) => console.log(`Error in Student 3: ${err}`));


