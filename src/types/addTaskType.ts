export interface addTaskProps {
  title: string;
  content: string;
  startDate: string;
  endDate: string;
}

export interface TaskProps extends addTaskProps {
  _id: string;
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
