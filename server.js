require("dotenv").config();
const express = require("express");
const cors = require("cors");
const RateLimit = require("express-rate-limit");
const compression = require("compression");
const mongoose = require("mongoose");
const http = require("http");

const DB_URL = process.env.DATABASE_URL;

mongoose.connect(DB_URL);
const db = mongoose.connection;

db.on("error", (error) => console.error(error));

db.once("connected", () => console.log("Connected to Database"));

const app = express();
const server = http.createServer(app);
const Ably = require("ably");
const realtime = new Ably.Realtime(process.env.ABLY_API_KEY);

realtime.connection.on("connected", () => {
  console.log("Connected to Ably!");
});

const channel = realtime.channels.get("comments");

app.set("channel", channel);

const corsOptions = {
  origin: "*",
};

const limiter = RateLimit({
  windowMs: 1 * 60 * 1000,
  max: 60,
});

app.use(cors(corsOptions));
app.use(limiter);
app.use(compression());
app.use(express.json());

// Routes
require("./app/routes/videos.routes")(app);
require("./app/routes/products.routes")(app);
require("./app/routes/users.routes")(app);
require("./app/routes/comments.routes")(app);

const port = process.env.PORT;
server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
