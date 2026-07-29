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
