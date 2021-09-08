const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const addData = require("./routes/data");
const adminRouter = require("./routes/admin");

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

// app.use(adminBro.options.rootPath, router)

app.use(addData);
app.use('/admin',adminRouter);
app.listen(3001, () => {
  console.log("Backend server is running!");
});
