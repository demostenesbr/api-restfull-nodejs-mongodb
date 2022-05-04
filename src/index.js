// config start
require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const app = express();

const Person = require('./Models/Person');

// JSON body parser / middleware

app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use(express.json());
// API routes
const personRoutes = require('./Routes/PersonalRoutes');
app.use('/person', personRoutes);

// routes / endpoints
app.get("/", (req, res) => {
  // view req
  res.send({ message: "Hello World!" });
});

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD);

mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.x7qob.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Connected to MongoDB!");
    app.listen(3000);
  })
  .catch((err) => console.log(err))
