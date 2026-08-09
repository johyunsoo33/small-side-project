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

// Task 와 Memo 는 서로 다른 컬렉션이라 _id 만으로는 출처를 알 수 없다.
// 최근 본 문서는 (type, _id) 복합키로 추적한다.
export type DocType = "task" | "memo";

export interface RecentRef {
  type: DocType;
  _id: string;
}

export type RecentDoc =
  | (TaskProps & { type: "task" })
  | (MemoProps & { type: "memo" });
