require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const DB_URL = process.env.DATABASE_URL;

mongoose.connect(DB_URL);
const db = mongoose.connection;

db.on("error", (error) => console.error(error));

db.once("connected", () => console.log("Connected to Database"));

const app = express();
const corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));
app.use(express.json());

// Routes
require("./app/routes/videos.routes")(app);
require("./app/routes/products.routes")(app);
require("./app/routes/users.routes")(app);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
