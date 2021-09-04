const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const addData = require("./routes/data");


dotenv.config();

mongoose.connect(
  process.env.TinyTrip_URL,
  { useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify:false },
  () => {
    console.log("Connected to MongoDB");
  }
);

//middleware
app.use(express.json());


app.use(addData);


app.listen(3000, () => {
  console.log("Backend server is running!");
});
