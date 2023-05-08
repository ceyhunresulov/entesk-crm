import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import studentRoutes from "./routes/studentRoutes.js";
import classRoutes from "./routes/classRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT;
const uri = process.env.DB_URI;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/api/user/student", studentRoutes);
app.use("/api/class", classRoutes);

app.get("/", (req, res) => {
  res.send("salam");
});

mongoose
  .connect(uri)
  .then(() => {
    console.log("connected database");
    app.listen(port, () => {
      console.log(`listen server at ${port}`);
    });
  })
  .catch((err) => console.log(err));