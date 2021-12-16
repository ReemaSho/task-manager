import express from "express";
const app = express();
import tasks from "./routes/tasks.js";
import mongooseDB from "./db/connect.js";
import { config } from "dotenv";
import notFound from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
const DB_URI = config();

//json middleware
app.use(express.json());
//routes

app.use("/api/v1/tasks", tasks);
app.use(notFound);
app.use(errorHandlerMiddleware);
//
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
