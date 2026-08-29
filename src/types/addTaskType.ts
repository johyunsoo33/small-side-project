export interface addTaskProps {
  title: string;
  content: string;
  startDate: string;
  endDate: string;
}

export interface TaskProps extends addTaskProps {
  _id: string;
  // 마지막으로 카드를 클릭한 시각(ISO 문자열). 서버 시계로 기록되며, 한 번도 안 봤으면 없다.
  lastViewedAt?: string;
  // 최근 24시간 안에 봤는지 여부. DB에 저장된 값이 아니라 서버가 lastViewedAt 으로
  // 응답할 때마다 계산해서 내려주는 값이므로 클라이언트에서 직접 수정하지 않는다.
  isRecent?: boolean;
}
export interface MemoAttachment {
  filename: string;
  originalname: string;
  path: string;
}

export interface addMemoProps {
  attachment?: MemoAttachment;
  title: string;
  content: string;
  startDate: string;
  endDate: string;
}

export interface MemoProps extends addMemoProps {
  _id: string;
  // 일정과 동일하게 조회 시각만 저장하고 isRecent 는 서버가 계산해서 내려준다.
  lastViewedAt?: string;
  isRecent?: boolean;
}

// 최근 본 문서 카드는 일정과 메모가 섞여 있다.
// type 으로 판별해야 메모에만 있는 attachment 를 안전하게 다룰 수 있다.
export type RecentDoc =
  | (TaskProps & { type: "task" })
  | (MemoProps & { type: "memo" });

// 참고: 최근 목록을 (type, _id) 복합키로 저장하던 시절의 타입.
// export type DocType = "task" | "memo";
//
// export interface RecentRef {
//   type: DocType;
//   _id: string;
// }
