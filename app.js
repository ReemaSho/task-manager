import express from "express";
const app = express();

const port = 3000;

//routes
app.get("/hello", (req, res) => {
  res.send("task manager app");
});
app.listen(port, console.log(`Server is listening on port ${port}...`));
