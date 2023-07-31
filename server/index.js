const cors = require("cors");
const express = require("express");
const dotenv = require("dotenv").config();
const connectDb = require("./db/connection");
const routes = require("./routes/usersRoutes");

const app = express();

const PORT = process.env.PORT;

connectDb();
app.use(express.json());
app.use(cors());
app.use(routes);

app.listen(PORT, () => {
  console.log("started at: ", PORT);
});
