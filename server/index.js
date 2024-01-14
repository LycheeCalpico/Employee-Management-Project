const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
const { default: mongoose } = require("mongoose");
const { default: mongoose } = require("mongoose");
require("dotenv").config();
const authRouter = require('./routes/auth');
const tokenHistoryRouter = require('./routes/tokenHistory');
const visaRouter = require('./routes/visa');
const personalInformationRouter = require('./routes/personalInformation');
const PORT = 4000;

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error(err.message);
  }
};

connectDB();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/auth", authRouter);
app.use("/api/tokenHistory", tokenHistoryRouter);
app.use("/api/personalInformation", personalInformationRouter);
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});
app.use("/api/visa", visaRouter);

app.listen(PORT, () => console.log("Server running on port 4000"));
