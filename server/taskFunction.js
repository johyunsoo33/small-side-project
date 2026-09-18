const express = require("express");
require("dotenv").config({ path: "./mongoDB/.env" });
const {
  find,
  findByID,
  insert,
  update,
  deleteByID,
} = require("./mongoDB/index");
const cors = require("cors");
const app = express();
const multer = require("multer");
const path = require("path");

// [설정] 메모 첨부파일을 uploads 폴더에 타임스탬프 이름으로 저장한다
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().valueOf() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

const corsOption = {
  origin: "http://localhost:3000",
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

// 최근 조회로 인정하는 기간
const RECENT_WINDOW_MS = 24 * 60 * 60 * 1000; // 24시간

// [공통] lastViewedAt 으로 isRecent 를 계산해 붙여준다. DB에는 저장하지 않는다.
const withIsRecent = (task) => {
  const viewedAt = task.lastViewedAt ? new Date(task.lastViewedAt) : null;
  const isRecent =
    viewedAt !== null && Date.now() - viewedAt.getTime() < RECENT_WINDOW_MS;
  return { ...task, isRecent };
};

app.listen(PORT, () => {
  console.log(`서버가 ${PORT}번으로 시작하였습니다.`);
});

// ===== 일정 =====

// [일정] 목록 조회
app.get("/api/tasks/get", async (req, res) => {
  const tasks = await find("Task");
  res.send(tasks.map(withIsRecent));
});

// [일정] 생성
app.post("/api/tasks/post", async (req, res) => {
  const r = await insert("Task", req.body.param);
  res.send(r);
});

// [일정] 수정
app.put("/api/tasks/put/:_id", async (req, res) => {
  const r = await update("Task", req.body.param, req.params._id);
  res.send(r);
});

// [일정] 조회 시각 기록 (최근 본 문서용)
app.put("/api/tasks/view/:_id", async (req, res) => {
  try {
    const r = await update("Task", { lastViewedAt: new Date() }, req.params._id);
    res.send(r);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

// [일정] 북마크 토글
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

// [일정] 삭제
app.delete("/api/tasks/delete/:_id", async (req, res) => {
  const r = await deleteByID("Task", req.params._id);
  res.send(r);
});

// ===== 메모 =====

// [메모] 목록 조회
app.get("/api/memos/get", async (req, res) => {
  const memos = await find("Memo");
  res.send(memos.map(withIsRecent));
});

// [메모] 생성 (첨부파일 포함)
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

// [메모] 수정
app.put("/api/memos/put/:_id", async (req, res) => {
  const r = await update("Memo", req.body.param, req.params._id);
  res.send(r);
});

// [메모] 조회 시각 기록 (최근 본 문서용)
app.put("/api/memos/view/:_id", async (req, res) => {
  try {
    const r = await update("Memo", { lastViewedAt: new Date() }, req.params._id);
    res.send(r);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

// [메모] 북마크 토글
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

// [메모] 삭제
app.delete("/api/memos/delete/:_id", async (req, res) => {
  const r = await deleteByID("Memo", req.params._id);
  res.send(r);
});

// ===== 카카오 =====

// [카카오] 토큰 서버에 요청. 최초 발급과 갱신 둘 다 이 함수를 쓴다.
async function requestKakaoToken(params) {
  const body = new URLSearchParams({
    client_id: process.env.KAKAO_REST_API_KEY,
    ...params,
  });
  if (process.env.KAKAO_CLIENT_SECRET) {
    body.set("client_secret", process.env.KAKAO_CLIENT_SECRET);
  }

  const kakaoRes = await fetch("https://kauth.kakao.com/oauth/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  const token = await kakaoRes.json();
  if (token.error) {
    throw new Error(token.error_description);
  }
  return token;
}

// [카카오] 유효한 access_token 반환. 만료가 가까우면 알아서 갱신한다.
async function getValidAccessToken() {
  const [saved] = await find("KakaoToken");
  if (!saved) {
    throw new Error("카카오 로그인이 필요합니다");
  }

  // 요청 도중 만료되는 걸 피하려고 5분 여유를 둔다
  const marginMs = 5 * 60 * 1000;
  if (Date.now() < new Date(saved.accessExpiresAt).getTime() - marginMs) {
    return saved.accessToken;
  }

  if (Date.now() >= new Date(saved.refreshExpiresAt).getTime()) {
    throw new Error("refresh_token 이 만료되었습니다. 다시 로그인해야 합니다");
  }

  const token = await requestKakaoToken({
    grant_type: "refresh_token",
    refresh_token: saved.refreshToken,
  });

  const now = Date.now();
  const updated = {
    accessToken: token.access_token,
    accessExpiresAt: new Date(now + token.expires_in * 1000),
  };
  // refresh_token 은 만료가 가까울 때만 새로 내려온다. 없으면 기존 것을 계속 쓴다.
  if (token.refresh_token) {
    updated.refreshToken = token.refresh_token;
    updated.refreshExpiresAt = new Date(
      now + token.refresh_token_expires_in * 1000,
    );
  }
  await update("KakaoToken", updated, saved._id);

  return updated.accessToken;
}

// [카카오] 인가 코드를 토큰으로 교환해 DB에 저장한다. 토큰은 브라우저로 돌려주지 않는다.
app.post("/api/kakao/token", async (req, res) => {
  try {
    const { code } = req.body;
    if (!code) {
      return res.status(400).send({ error: "code가 없습니다" });
    }

    const token = await requestKakaoToken({
      grant_type: "authorization_code",
      redirect_uri: process.env.KAKAO_REDIRECT_URI,
      code,
    });

    const now = Date.now();
    const tokenDoc = {
      accessToken: token.access_token,
      refreshToken: token.refresh_token,
      accessExpiresAt: new Date(now + token.expires_in * 1000),
      refreshExpiresAt: new Date(now + token.refresh_token_expires_in * 1000),
    };

    // 개인용이라 토큰 문서는 하나만 유지한다
    const existing = await find("KakaoToken");
    if (existing.length > 0) {
      await update("KakaoToken", tokenDoc, existing[0]._id);
    } else {
      await insert("KakaoToken", tokenDoc);
    }

    res.send({ ok: true });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// [카카오] 연동 상태 확인
app.get("/api/kakao/status", async (req, res) => {
  try {
    await getValidAccessToken();
    const [saved] = await find("KakaoToken");
    res.send({
      connected: true,
      accessExpiresAt: saved.accessExpiresAt,
      refreshExpiresAt: saved.refreshExpiresAt,
    });
  } catch (err) {
    res.send({ connected: false, error: err.message });
  }
});
