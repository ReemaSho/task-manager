import express from "express";
const app = express();
import tasks from "./routes/tasks.js";
import mongooseDB from "./db/connect.js";
import { config } from "dotenv";
const DB_URI = config();
//json middleware
app.use(express.json());
//routes
app.get("/hello", (req, res) => {
  res.send("task manager app");
});

app.use("/api/v1/tasks", tasks);
const port = 3000;
//connect DB
const start = async () => {
  try {
    await mongooseDB(DB_URI.parsed.MONGO_URI);
    app.listen(port, console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};
start();
