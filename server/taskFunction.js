const express = require("express");
require("dotenv").config({ path: "./mongoDB/.env" });
const { find, findByID, insert, update, deleteByID } = require("./mongoDB/index");
const cors = require("cors");
const app = express();
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().valueOf() + path.extname(file.originalname));
  },
});

// 위에서 만든 저장 설정을 multer에 등록합니다.
const upload = multer({ storage: storage });

const corsOption = {
  origin: "http://localhost:3000", // 허용할 Origin 설정
  optionSuccessStatus: 200,
};

app.use(cors(corsOption));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(
  express.json({
    limit: "50mb",
  }),
);
const PORT = process.env.PORT || 4000;

// 최근 조회로 인정하는 기간. 이 시간이 지나면 자동으로 isRecent 가 false 가 된다.
const RECENT_WINDOW_MS = 24 * 60 * 60 * 1000; // 24시간

// isRecent 는 DB에 저장하지 않고 lastViewedAt 으로부터 응답 시점에 계산한다.
// 저장된 플래그를 주기적으로 지우는 방식과 달리 서버가 꺼져 있던 시간과 무관하게
// "마지막으로 본 지 24시간이 지났는가" 가 항상 정확하게 계산된다.
const withIsRecent = (task) => {
  const viewedAt = task.lastViewedAt ? new Date(task.lastViewedAt) : null;
  const isRecent =
    viewedAt !== null && Date.now() - viewedAt.getTime() < RECENT_WINDOW_MS;
  return { ...task, isRecent };
};

// 테스크
app.listen(PORT, () => {
  console.log(`서버가 ${PORT}번으로 시작하였습니다.`);
});

app.get("/api/tasks/get", async (req, res) => {
  const tasks = await find("Task");
  res.send(tasks.map(withIsRecent));
});

app.post("/api/tasks/post", async (req, res) => {
  const r = await insert("Task", req.body.param);
  res.send(r);
});

app.put("/api/tasks/put/:_id", async (req, res) => {
  const r = await update("Task", req.body.param, req.params._id);
  res.send(r);
});

// 일정 카드를 클릭했을 때 "마지막으로 본 시각"을 기록한다.
// 시각은 클라이언트가 보낸 값이 아니라 서버 시계로 찍어야 기기마다 시간이 어긋나지 않는다.
app.put("/api/tasks/view/:_id", async (req, res) => {
  try {
    const r = await update(
      "Task",
      { lastViewedAt: new Date() },
      req.params._id,
    );
    res.send(r);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

// 현재 값을 읽어 반대로 뒤집는다. 클라이언트가 상태를 보내지 않아도
// 같은 버튼으로 북마크/해제가 모두 처리된다. 필드명은 클라이언트와 맞춘 isBookMarked.
app.put("/api/tasks/bookmark/:_id", async (req, res) => {
  try {
    const task = await findByID("Task", req.params._id);
    const r = await update(
      "Task",
      { isBookMarked: !task?.isBookMarked },
      req.params._id,
    );
    res.send(r);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

app.delete("/api/tasks/delete/:_id", async (req, res) => {
  const r = await deleteByID("Task", req.params._id);
  res.send(r);
});

// 메모
app.get("/api/memos/get", async (req, res) => {
  const memos = await find("Memo");
  res.send(memos.map(withIsRecent));
});

app.post("/api/memos/post", upload.single("attachment"), async (req, res) => {
  try {
    const param = JSON.parse(req.body.param);
    if (req.file) {
      param.attachment = {
        filename: req.file.filename,
        originalname: req.file.originalname,
        path: req.file.path,
      };
    }
    const r = await insert("Memo", param);
    res.send({ ...r, file: req.file });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

app.put("/api/memos/put/:_id", async (req, res) => {
  const r = await update("Memo", req.body.param, req.params._id);
  res.send(r);
});

// 메모를 클릭했을 때 "마지막으로 본 시각"을 기록한다. 일정 쪽과 동작이 같다.
app.put("/api/memos/view/:_id", async (req, res) => {
  try {
    const r = await update(
      "Memo",
      { lastViewedAt: new Date() },
      req.params._id,
    );
    res.send(r);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

app.put("/api/memos/bookmark/:_id", async (req, res) => {
  try {
    const memo = await findByID("Memo", req.params._id);
    const r = await update(
      "Memo",
      { isBookMarked: !memo?.isBookMarked },
      req.params._id,
    );
    res.send(r);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

app.delete("/api/memos/delete/:_id", async (req, res) => {
  const r = await deleteByID("Memo", req.params._id);
  res.send(r);
});

// 최근 본 문서
// 최근 목록은 lastViewedAt 이 최근 24시간 안에 있는 문서를 뽑아 최신순으로 정렬한 것이다.
// 그 판단(isRecent)은 위 GET 응답에서 이미 계산해 붙여주고 카드 내용도 같은 응답에 들어 있으므로
// 최근 목록만을 위한 별도 조회 API 는 필요 없다.

// 클라이언트가 컬렉션명을 직접 넘기지 못하도록 type 으로만 받아서 서버에서 매핑한다.
// const COLLECTION_BY_TYPE = {
//   task: "Task",
//   memo: "Memo",
// };

// app.post("/api/recent/post", async (req, res) => {
//   try {
//     const refs = Array.isArray(req.body.param) ? req.body.param : [];
//     const validRefs = refs.filter((ref) => COLLECTION_BY_TYPE[ref?.type] && ref?._id);

//     // type 별로 묶어서 컬렉션마다 한 번씩만 조회한다
//     const idsByType = {};
//     for (const { type, _id } of validRefs) {
//       (idsByType[type] ||= []).push(_id);
//     }

//     const found = await Promise.all(
//       Object.entries(idsByType).map(async ([type, ids]) => {
//         const docs = await findByIds(COLLECTION_BY_TYPE[type], ids);
//         // 조회 결과에 출처(type)를 붙여야 클라이언트에서 어떤 카드인지 구분할 수 있다
//         return docs.map((doc) => ({ ...doc, type }));
//       }),
//     );

//     // (type, _id) 복합키로 찾아 클라이언트가 보낸 최근 순서 그대로 되돌려준다.
//     // 삭제된 문서는 조회되지 않으므로 자연스럽게 빠진다.
//     const docMap = new Map(
//       found.flat().map((doc) => [`${doc.type}:${doc._id}`, doc]),
//     );
//     const ordered = validRefs
//       .map((ref) => docMap.get(`${ref.type}:${ref._id}`))
//       .filter(Boolean);

//     res.send(ordered);
//   } catch (err) {
//     res.status(500).send({ error: err.message });
//   }
// });
