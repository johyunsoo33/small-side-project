const express = require("express");
require("dotenv").config({ path: "./mongoDB/.env" });
const { find, insert, update, deleteByID } = require("./mongoDB/index");
const app = express();

app.use(
  express.json({
    limit: "50mb",
  }),
);
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`서버가 ${PORT}번으로 시작하였습니다.`);
});
app.get("/api/tasks/get", async (req, res) => {
  const tasks = await find("Task");
  res.send(tasks);
});
app.post("/api/tasks/post", async (req, res) => {
  const r = await insert("Task", req.body.param);
  res.send(r);
});
app.put("/api/tasks/put/:_id", async (req, res) => {
  const r = await update("Task", req.body.param, req.params._id);
  res.send(r);
});
app.delete("/api/tasks/delete/:_id", async (req, res) => {
  const r = await deleteByID("Task", req.params._id);
  res.send(r);
});
