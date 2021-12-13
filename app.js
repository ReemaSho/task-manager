import express from "express";
const app = express();
import tasks from "./routes/tasks.js";
//json middleware
app.use(express.json());
//routes
app.get("/hello", (req, res) => {
  res.send("task manager app");
});

app.use("/api/v1/tasks", tasks);

const port = 3000;
app.listen(port, console.log(`Server is listening on port ${port}...`));
