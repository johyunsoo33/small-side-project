const express = require("express");
require("dotenv").config({ path: "./mongoDB/.env" });
const { find, insert, update, deleteByID } = require("./mongoDB/index");
const cors = require("cors");
const app = express();
const multer = require("multer");
const path = require("path");

const corsOption = {
  origin: "http://localhost:3000", // 허용할 Origin 설정
  optionSuccessStatus: 200,
};

app.use(cors(corsOption));
app.use(
  express.json({
    limit: "50mb",
  }),
);
const PORT = process.env.PORT || 4000;

// 테스크
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

// 메모
app.get("/api/memos/get", async (req, res) => {
  const memos = await find("Memo");
  res.send(memos);
});
app.post("/api/memos/post", async (req, res) => {
  const r = await insert("Memo", req.body.param);
  res.send(r);
});
app.put("/api/memos/put/:_id", async (req, res) => {
  const r = await update("Memo", req.body.param, req.params._id);
  res.send(r);
});
app.delete("/api/memos/delete/:_id", async (req, res) => {
  const r = await deleteByID("Memo", req.params._id);
  res.send(r);
});
