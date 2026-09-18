// 일정 생성 시 입력받는 필드
export interface addTaskProps {
  title: string;
  content: string;
  startDate: string;
  endDate: string;
}

// 서버에서 내려오는 일정 문서
export interface TaskProps extends addTaskProps {
  _id: string;
  lastViewedAt?: string;
  // 서버가 lastViewedAt 으로 계산해 내려주는 값. 클라이언트에서 직접 수정하지 않는다.
  isRecent?: boolean;
  isBookMarked?: boolean;
}

// 메모 첨부파일
export interface MemoAttachment {
  filename: string;
  originalname: string;
  path: string;
}

// 메모 생성 시 입력받는 필드
export interface addMemoProps {
  attachment?: MemoAttachment;
  title: string;
  content: string;
  startDate: string;
  endDate: string;
}

// 서버에서 내려오는 메모 문서
export interface MemoProps extends addMemoProps {
  _id: string;
  lastViewedAt?: string;
  isRecent?: boolean;
  isBookMarked?: boolean;
}

// 최근/북마크 목록은 일정과 메모가 섞여 있어 type 으로 구분한다
export type RecentDoc =
  | (TaskProps & { type: "task" })
  | (MemoProps & { type: "memo" });
